import { useEffect, useMemo, useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { uploadVideoToSupabase } from "../../utils/uploadVideo";

export default function Playback() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { width, height } = useWindowDimensions(); // Get screen size
  const [isUploading, setIsUploading] = useState(false); // State for loading indicator

  const videoUri = useMemo(() => {
    return Array.isArray(params.uri) ? params.uri[0] : params.uri;
  }, [params.uri]);

  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
    player.play();
  });

  const handleSend = async () => {
    setIsUploading(true);
    player.pause(); // Pause the video when sending

    await uploadVideoToSupabase(videoUri);

    setIsUploading(false);
    router.push("/videoFeatures/youdidit");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://via.placeholder.com/400x800.png?text=Blurred+Background",
        }}
        style={styles.backgroundImage}
      >
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>watch your</Text>
          <Text style={styles.title}>masterpiece</Text>
        </View>

        {/* Video Player Container */}
        <View style={[styles.videoContainer, { width: width * 0.9, height: height * 0.45 }]}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>

        {/* Uploading Spinner */}
        {isUploading && <ActivityIndicator size="large" color="white" style={styles.loadingSpinner} />}

        {/* Send Button */}
        <Pressable style={[styles.nextButton, { width: width * 0.8 }]} onPress={handleSend} disabled={isUploading}>
          <Text style={styles.nextButtonText}>{isUploading ? "Uploading..." : "Send"}</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

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
    marginTop: "15%",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  subtitle: {
    fontFamily: "Hind_700",
    fontSize: 36,
    color: "#ffffff",
    lineHeight: 44,
  },
  title: {
    fontSize: 38,
    fontFamily: "Gluten_700Bold",
    color: "white",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  videoContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    objectFit: "cover", // Alternative for resizeMode
  },
  loadingSpinner: {
    marginVertical: 20,
  },
  nextButton: {
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    maxWidth: 300,
    marginBottom: "8%",
  },
  nextButtonText: {
    fontSize: 22,
    fontFamily: "Gluten_700Bold",
    color: "black",
    textAlign: "center",
  },
});
