import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { supabase } from "../../utils/supabase";

const { width, height } = Dimensions.get("window");

const Profile: FC = () => {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState<string>("Loading...");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("name, profile_picture")
        .eq("id", user.user.id)
        .single();

      if (!error && data) {
        setName(data.name || "Unknown User");
        if (data.profile_picture) {
          const { data: signed, error: signedError } = await supabase.storage
            .from("profile_pictures")
            .createSignedUrl(data.profile_picture, 60 * 60);
          if (!signedError && signed) setProfilePic(signed.signedUrl);
        }
      }
    };
    fetchUserProfile();
  }, []);

  const pickProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfilePic(uri);
      await uploadProfilePicture(uri);
    }
  };

  const uploadProfilePicture = async (uri: string) => {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) return;

    const fileExt = uri.split(".").pop();
    const fileName = `${user.user.id}.${fileExt}`;
    const filePath = `profile_pictures/${fileName}`;

    const file = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const buffer = Buffer.from(file, "base64");
    const contentType = `image/${fileExt}`;

    await supabase.storage.from("profile_pictures").remove([filePath]);
    const { error } = await supabase.storage
      .from("profile_pictures")
      .upload(filePath, buffer, { contentType, upsert: true });

    if (!error) {
      const { data: signed } = await supabase.storage
        .from("profile_pictures")
        .createSignedUrl(filePath, 60 * 60);
      if (signed) setProfilePic(signed.signedUrl);
      await supabase.from("profiles").update({ profile_picture: filePath }).eq("id", user.user.id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Profile Picture</Text>
        <Pressable onPress={pickProfilePicture}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.image} />
          ) : (
            <Text style={styles.noImage}>Tap to select image</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.08,
    alignItems: "center",
  },
  header: {
    fontSize: width * 0.08,
    fontFamily: "Gluten_700Bold",
    color: "white",
    marginBottom: height * 0.05,
    textAlign: "center",
  },
  section: {
    width: "100%",
    marginBottom: height * 0.04,
    alignItems: "center",
  },
  label: {
    fontSize: width * 0.045,
    fontFamily: "Hind_700",
    color: "white",
    marginBottom: 8,
  },
  value: {
    fontSize: width * 0.05,
    fontFamily: "Hind_700",
    color: "white",
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    marginTop: 10,
  },
  noImage: {
    fontSize: width * 0.04,
    color: "#aaa",
    fontFamily: "Hind_700",
    textAlign: "center",
    paddingVertical: 10,
  },
});

export default Profile;
