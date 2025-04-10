import { supabase } from "./supabase";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import moment from "moment-timezone"; // ✅ Helps format date

global.Buffer = require("buffer").Buffer;

export async function userPosted() {

    let filePath = "";

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

    console.log("Checking if video posted", filePath);

    // ✅ Check if a video already exists for this user on this date
    const { data: existingVideo, error: fetchError } = await supabase
      .from("videouploads")
      .select("video_url")
      .eq("user_id", userId)
      .eq("video_url", filePath)
      .single();

    if (existingVideo) {
      console.log("video found");
      return true;
    }

    else {
      Alert.alert("Upload your WeFeel for the day", "Before you can see others, you must upload your own response!");
      console.log("no video found");
      return false;
    }
  } catch (error) {
    console.error("❌ Error checking video:", error);
    Alert.alert("checking Error", "Something went wrong during post check.");
    return false;
  }
}