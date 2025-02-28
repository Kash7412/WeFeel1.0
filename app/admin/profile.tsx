import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Modal,
  Button,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // ✅ Import FileSystem for reading images
import { supabase } from "../../utils/supabase";

const Profile: FC = () => {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching user profile...");
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError || !user?.user) {
          console.error("❌ Error fetching user:", userError);
          return;
        }
    
        const { data, error } = await supabase
          .from("profiles")
          .select("name, profile_picture")
          .eq("id", user.user.id)
          .single();
    
        if (error) {
          console.error("❌ Error fetching profile:", error.message);
          return;
        }
    
        setName(data.name || "Unknown User");
    
        if (data.profile_picture) {
          console.log("✅ Stored profile picture path:", data.profile_picture);
        
          // Generate a signed URL that works for private buckets
          const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from("profile_pictures")
            .createSignedUrl(data.profile_picture, 60 * 60); // URL valid for 1 hour
        
          if (signedUrlError) {
            console.error("❌ Error generating signed URL:", signedUrlError.message);
          } else {
            console.log("✅ Retrieved Signed URL:", signedUrlData.signedUrl);
            setProfilePic(signedUrlData.signedUrl);
          }
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };
  
    fetchUserProfile();
  }, []);

  const updateUserName = async () => {
    try {
      console.log("Updating user name:", name);
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        console.error("❌ Error fetching user:", userError);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ name })
        .eq("id", user.user.id);

      if (error) {
        Alert.alert("Error", "Failed to update name.");
        console.error("❌ Error updating name:", error.message);
      } else {
        Alert.alert("Success", "Your name has been updated.");
      }
    } catch (err) {
      console.error("❌ Error updating name:", err);
    }
  };

  const pickProfilePicAsync = async () => {
    try {
      console.log("Opening image picker...");
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        console.log("✅ Image selected:", imageUri);
        setProfilePic(imageUri);
        await uploadProfilePicture(imageUri);
      } else {
        alert("You did not select any image.");
      }
    } catch (err) {
      console.error("❌ Error picking image:", err);
    }
  };

  const uploadProfilePicture = async (uri: string) => {
    try {
      console.log("📤 Uploading profile picture...");

      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        console.error("❌ Error fetching user:", userError);
        return;
      }

      const fileExt = uri.split(".").pop();
      const fileName = `${user.user.id}.${fileExt}`;
      const filePath = `profile_pictures/${fileName}`; // ✅ Store only this in DB

      // 🗑️ **Check & Delete Existing Profile Picture**
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("profile_picture")
        .eq("id", user.user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("❌ Error checking existing profile picture:", profileError.message);
        return;
      }

      if (profileData?.profile_picture) {
        const oldFilePath = profileData.profile_picture; // ✅ Already in correct format

        console.log(`🗑️ Attempting to delete old profile picture: ${oldFilePath}`);

        const { error: deleteError } = await supabase.storage
          .from("profile_pictures")
          .remove([oldFilePath]); // ✅ Ensure file is deleted

        if (deleteError) {
          console.error("❌ Error deleting old profile picture:", deleteError.message);
        } else {
          console.log("✅ Old profile picture deleted successfully.");
        }
      }

      // ✅ Wait before uploading new file
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ✅ Convert image to Supabase-compatible format
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const buffer = Buffer.from(file, "base64");
      const contentType = `image/${fileExt}`;

      console.log(`📤 Uploading new profile picture: ${filePath}`);

      // ✅ Force overwrite by ensuring old file is deleted first
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile_pictures")
        .upload(filePath, buffer, { contentType, upsert: true }); // ✅ Use upsert flag

      if (uploadError) {
        console.error("❌ Upload error:", uploadError.message);
        return;
      }

      console.log("✅ Upload successful! Fetching signed URL...");

      // ✅ Generate a **signed URL** for accessing the private image
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from("profile_pictures")
        .createSignedUrl(filePath, 60 * 60); // URL valid for 1 hour

      if (signedUrlError) {
        console.error("❌ Error generating signed URL:", signedUrlError.message);
        return;
      }

      console.log("✅ Signed URL:", signedUrlData.signedUrl);

      // ✅ Update the profile with the **file path** (NOT full URL)
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ profile_picture: filePath }) // ✅ Storing the file path
        .eq("id", user.user.id);

      if (updateError) {
        console.error("❌ Update error:", updateError.message);
      } else {
        console.log("✅ Profile picture updated successfully.");

        // ✅ Update the UI with the new signed URL
        setProfilePic(signedUrlData.signedUrl);
      }
    } catch (err) {
      console.error("❌ Error uploading profile picture:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.value}>{name}</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Pressable onPress={pickProfilePicAsync}>
          <Text style={styles.label}>Profile Picture</Text>
        </Pressable>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>No profile picture</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 80,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Hind_700",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    color: "white",
    fontSize: 32,
    fontFamily: "Gluten_700Bold",
    textAlign: "center",
    marginBottom: 30,
  },
  section: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    color: "white",
    fontSize: 18,
    fontFamily: "Hind_700",
    marginBottom: 10,
  },
  value: {
    color: "white",
    fontSize: 18,
    fontFamily: "Hind_700",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
  },
  noImageText: {
    color: "#aaa",
    fontSize: 16,
    fontFamily: "Hind_700",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});

export default Profile;