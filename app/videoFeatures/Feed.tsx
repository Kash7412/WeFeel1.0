import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";

const { width, height } = Dimensions.get("window");

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("wefeel-videos")
        .list("videos", { limit: 10 });

      if (error) {
        console.error("Error fetching video list:", error.message);
        return;
      }

      const signedUrls = await Promise.all(
        data.map(async (file) => {
          const { data, error } = await supabase.storage
            .from("wefeel-videos")
            .createSignedUrl(`videos/${file.name}`, 3600);

          if (error) {
            console.error("Error generating signed URL:", error.message);
            return null;
          }

          return data.signedUrl;
        })
      );

      const filteredUrls = signedUrls.filter(url => url !== null);
      setVideos(filteredUrls);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={videos}
          horizontal={false}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <VideoCard videoUrl={item} />
          )}
          style={{ width }}
        />
      )}
    </View>
  );
}

const VideoCard = ({ videoUrl }) => {
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
      <View style={styles.frame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  videoContainer: {
    width: width,
    height: height, // Full screen height for each video
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden', // Ensures the video is clipped to the frame shape
  },
  video: {
    width: "100%",
    height: "100%",
  },
  frame: {
    position: 'absolute',
    top: '15%', // Position to vertically center the frame
    left: '10%', // Position to horizontally center the frame
    width: '80%', // Width of the visible frame area
    height: '70%', // Height of the visible frame area
    borderRadius: 20, // Rounded corners for the frame
    borderWidth: 10, // Border width to create frame effect
    borderColor: 'white', // Frame color
    backgroundColor: 'transparent', // Ensure the frame does not block the video
  },
  loadingText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: height / 2 - 10,
  },
});
