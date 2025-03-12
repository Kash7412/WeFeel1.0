import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";
import moment from "moment-timezone"; // Ensure moment.js is installed

const { width, height } = Dimensions.get("window");

// User profile UI
const UserProfile = () => {
  return (
    <View style={styles.userProfile}>
      <Image source={require("../../assets/profile.png")} style={styles.profilePic} />
      <Text style={styles.username}>User123</Text>
    </View>
  );
};

// Daily prompt UI
const DailyPrompt = () => {
  return (
    <View style={styles.promptContainer}>
      <Text style={styles.promptText}>Today's prompt:</Text>
      <Text style={styles.prompt}>Share a video of something that made you smile!</Text>
    </View>
  );
};

//TODO: Add this to the utils folder
export const getVideoURLs = async (videoPaths: string[]): Promise<string[]> => {
  try {
    const bucketName = "wefeel-videos"; // Make sure this matches your actual bucket name in Supabase

    const videoURLs = await Promise.all(
      videoPaths.map(async (path) => {
        // Remove "videos/" prefix if it exists
        const filePath = path;

        console.log("🔎 Fetching signed URL for:", filePath);

        const { data, error } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(filePath, 3600); // 1-hour expiration

        if (error) {
          console.error("❌ Error generating signed URL for:", filePath, error.message);
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

export default function Feed() {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<string> | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetches 3 random videos from today's date
  const fetchVideos = async () => {
    try {
      const today = moment().tz("America/Los_Angeles").startOf("day").format("YYYY-MM-DD HH:mm:ss");
      console.log("📤 Fetching videos for:", today);

      const { data, error } = await supabase.rpc("get_random_videos", {
        today_date: today,
        video_limit: 3,
      });

      if (error) {
        console.error("❌ Error fetching videos from Supabase:", error.message);
        setLoading(false);
        return;
      }

      if (data && Array.isArray(data)) {
        const videoPaths = data.map((item) => item.video_url); // Extract paths
        const videoURLs = await getVideoURLs(videoPaths); // Convert to full URLs
        setVideos(videoURLs); // Store URLs in state
      }

      setLoading(false);
    } catch (error) {
      console.error("❌ Error in fetchVideos function:", error);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://via.placeholder.com/400x800.png?text=Blurred+Background" }}
      style={styles.backgroundImage}
    >
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={videos}
          pagingEnabled
          horizontal={false}
          keyExtractor={(item) => item} // Use unique video URL as key
          renderItem={({ item, index }) => <VideoCard videoUrl={item} isActive={index === currentIndex} />}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setCurrentIndex(viewableItems[0].index ?? 0);
            }
          }}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        />
      )}
      <UserProfile />
      <DailyPrompt />
    </ImageBackground>
  );
}

const VideoCard = ({ videoUrl, isActive }: { videoUrl: string; isActive: boolean }) => {
  const player = useVideoPlayer(videoUrl);

  useEffect(() => {
    if (isActive) {
      player.play();
      player.loop = true;
    } else {
      player.pause();
    }
  }, [isActive]);

  return (
    <View style={styles.videoContainer}>
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  userProfile: {
    position: "absolute",
    top: height * 0.1,
    left: width * 0.05,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: 8,
  },
  profilePic: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    marginRight: width * 0.03,
  },
  username: {
    color: "white",
    fontSize: width * 0.045,
    fontWeight: "bold",
    textShadowColor: "grey",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 5,
  },
  videoContainer: {
    width: "100%",
    height: height * 0.9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  promptContainer: {
    position: "absolute",
    top: height * 0.1,
    right: width * 0.05,
    padding: width * 0.02,
    borderRadius: 8,
    maxWidth: "40%",
  },
  promptText: {
    fontWeight: "bold",
    fontSize: width * 0.08,
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 5,
    color: "white",
  },
  prompt: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    color: "white",
  },
});