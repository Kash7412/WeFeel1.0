import { supabase } from "./supabase";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import moment from "moment-timezone"; // ✅ Helps format date

global.Buffer = require("buffer").Buffer;

export async function uploadVideoToSupabase(videoUri: string) {
  if (!videoUri) {
    Alert.alert("Error", "No video file found.");
    return null;
  }

  console.log("📂 Video URI:", videoUri);

  let filePath = "";
  let publicUrl = null;

  try {
    // 🔹 Get the current user from Supabase Auth
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("❌ Error fetching user:", userError);
      return null;
    }

    const userId = user.user.id; // ✅ Extract user ID
    const date = moment().tz("America/Los_Angeles").format("DD-MM-YYYY");
    const fileName = `${userId}_${date}.mp4`;
    filePath = `videos/${fileName}`;

    console.log("📤 Uploading video with filename:", filePath);

    // ✅ Check if a video already exists for this user on this date
    const { data: existingVideo, error: fetchError } = await supabase
      .from("videouploads")
      .select("video_url")
      .eq("user_id", userId)
      .eq("video_url", filePath)
      .single();

    if (existingVideo) {
      console.warn("⚠️ A video for today already exists. Skipping upload.");
      Alert.alert("Upload Skipped", "You have already uploaded a video today.");
      return null;
    }

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("❌ Error checking existing video:", fetchError.message);
      return null;
    }

    console.log("✅ No existing video found. Proceeding with upload...");

    // 🔹 Read the video file
    const fileData = await FileSystem.readAsStringAsync(videoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("✅ File read successfully. Size:", fileData.length);

    // 🔹 Convert base64 to binary buffer
    const fileBuffer = Buffer.from(fileData, "base64");

    // 🔹 Upload the video to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("wefeel-videos") // ✅ Ensure this is the correct bucket name
      .upload(filePath, fileBuffer, { contentType: "video/mp4" });

    if (uploadError) {
      console.error("❌ Upload error:", uploadError.message);
      Alert.alert("Upload Failed", uploadError.message);
      return null;
    }

    console.log("✅ Upload successful! Generating signed URL...");

    // ✅ Generate a signed URL for private access
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("wefeel-videos")
      .createSignedUrl(filePath, 60 * 60); // ✅ URL valid for 1 hour

    if (signedUrlError) {
      console.error("❌ Error generating signed URL:", signedUrlError.message);
      return null;
    }

    publicUrl = signedUrlData.signedUrl;
    console.log("🌍 Signed URL:", publicUrl);
  } catch (uploadError) {
    console.error("❌ Error uploading video:", uploadError);
    Alert.alert("Upload Error", "Something went wrong during upload.");
    return null;
  }

  // 🔹 Separate try-catch for inserting into the database
  try {
    console.log("📝 Inserting video metadata into `videouploads` table...");

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("❌ Error fetching user:", userError);
      return null;
    }

    const userId = user.user.id; // ✅ Extract user ID

    const { error: insertError } = await supabase
      .from("videouploads")
      .insert([
        {
          user_id: userId, // ✅ Store the user's ID
          video_url: filePath, // ✅ Store the **file path** (not full URL)
          created_at: new Date().toISOString(), // ✅ Store timestamp
        },
      ]);

    if (insertError) {
      console.error("❌ Database insert error:", insertError.message);
      return null;
    }

    console.log("✅ Video entry added to `videouploads` table!");
  } catch (dbError) {
    console.error("❌ Error inserting video into database:", dbError);
    Alert.alert("Database Error", "Something went wrong when saving video info.");
    return null;
  }

  return publicUrl;
}