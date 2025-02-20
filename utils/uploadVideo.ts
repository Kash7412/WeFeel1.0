import { supabase } from "./supabase";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

// Function to upload video to Supabase
export async function uploadVideoToSupabase(videoUri: string) {
  try {
    if (!videoUri) {
      Alert.alert("Error", "No video file found.");
      return null;
    }

    // Read the video file as a binary blob
    const fileData = await FileSystem.readAsStringAsync(videoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 to binary buffer
    const fileBuffer = Buffer.from(fileData, "base64");

    // Generate a unique filename
    const fileName = `videos/${Date.now()}.mp4`;

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("videos") // Make sure your Supabase bucket is named "videos"
      .upload(fileName, fileBuffer, {
        contentType: "video/mp4",
      });

    if (error) {
      console.error("Upload error:", error.message);
      Alert.alert("Upload Failed", error.message);
      return null;
    }

    // Generate a public URL for the uploaded video
    const { data: publicUrlData } = supabase.storage
      .from("videos")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl; // Return the public URL of the uploaded video
  } catch (error) {
    console.error("Error uploading video:", error);
    Alert.alert("Upload Error", "Something went wrong.");
    return null;
  }
}
