import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";

export default function Feed() {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchVideos();
  }, []);

  // Function to fetch video URLs from Supabase (Private Bucket with Signed URLs)
  const fetchVideos = async () => {
    try {
      console.log("Fetching video list...");
      const { data, error } = await supabase.storage
        .from("wefeel-videos")
        .list("videos", { limit: 10 });

      if (error) {
        console.error("Error fetching video list:", error.message);
        return;
      }

      console.log("Files found:", data);

      // Generate signed URLs for each video (valid for 1 hour)
      const signedUrls = await Promise.all(
        data.map(async (file) => {
          const { data, error } = await supabase.storage
            .from("wefeel-videos")
            .createSignedUrl(`videos/${file.name}`, 3600); // Ensure correct subfolder path

          if (error) {
            console.error("Error generating signed URL:", error.message);
            return null;
          }

          return data.signedUrl; // Return the signed URL
        })
      );

      const filteredUrls = signedUrls.filter((url) => url !== null);
      setVideos(filteredUrls);
      setLoading(false);
      console.log("Fetched Signed Video URLs:", filteredUrls);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://via.placeholder.com/400x800.png?text=Blurred+Background",
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Text style={styles.subtitle}>watch the</Text>
          <Text style={styles.title}>wefeel feed</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : videos.length === 0 ? (
          <Text style={styles.noVideosText}>No videos available</Text>
        ) : (
          <FlatList
            data={videos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <VideoCard videoUrl={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Button to go back */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push("/videoFeatures/record")}
        >
          <Text style={styles.startButtonText}>back</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

// Component to display each video in the feed
const VideoCard = ({ videoUrl }: { videoUrl: string }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.videoContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  header: {
    marginTop: 120,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontFamily: "Hind_700",
    fontSize: 38,
    color: "#ffffff",
    lineHeight: 48,
  },
  title: {
    fontSize: 38,
    fontFamily: "Gluten_700Bold",
    color: "white",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  noVideosText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  videoContainer: {
    width: 350,
    height: 400,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  video: {
    flex: 1,
  },
  startButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginBottom: 50,
  },
  startButtonText: {
    fontSize: 20,
    fontFamily: "Gluten_700Bold",
    color: "black",
  },
});