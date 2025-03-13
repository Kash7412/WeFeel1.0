import { supabase } from "../utils/supabase";
import moment from "moment-timezone"; // Ensure moment.js is installed

const BUCKET_NAME = "wefeel-videos"; // Change if your actual bucket name is different

/**
 * Generates signed URLs for video file paths stored in Supabase Storage.
 * @param {string[]} videoPaths - Array of video file paths from Supabase Storage.
 * @returns {Promise<string[]>} - Array of public URLs for videos.
 */
export const getVideoURLs = async (videoPaths: string[]): Promise<string[]> => {
  try {
    const videoURLs = await Promise.all(
      videoPaths.map(async (path) => {
        console.log("🔎 Fetching signed URL for:", path);

        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .createSignedUrl(path, 3600); // 1-hour expiration

        if (error) {
          console.error("❌ Error generating signed URL for:", path, error.message);
          return null;
        }
        return data.signedUrl;
      })
    );

    return videoURLs.filter((url) => url !== null); // Remove any failed URLs
  } catch (error) {
    console.error("❌ Error in getVideoURLs function:", error);
    return [];
  }
};

/**
 * Fetches random videos uploaded today and converts them to public URLs.
 * @returns {Promise<string[]>} - Array of video URLs.
 */
export const fetchVideos = async (): Promise<string[]> => {
  try {
    const today = moment().tz("America/Los_Angeles").startOf("day").format("YYYY-MM-DD HH:mm:ss");
    console.log("📤 Fetching videos for:", today);

    const { data, error } = await supabase.rpc("get_random_videos", {
      today_date: today,
      video_limit: 5,
    });

    if (error) {
      console.error("❌ Error fetching videos from Supabase:", error.message);
      return [];
    }

    if (data && Array.isArray(data)) {
      const videoPaths = data.map((item) => item.video_url); // Extract file paths
      return getVideoURLs(videoPaths); // Convert to full URLs and return
    }

    return [];
  } catch (error) {
    console.error("❌ Error in fetchVideos function:", error);
    return [];
  }
};