import { useEvent } from "expo";
import { useEffect, useMemo } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {uploadVideoToSupabase} from "../../utils/uploadVideo";

export default function Playback() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const videoUri = useMemo(()=> {
      return Array.isArray(params.uri) ? params.uri[0] : params.uri
  }, [
    router
  ]
  );

  const player = useVideoPlayer(
    Array.isArray(params.uri) ? params.uri[0] : params.uri,
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://via.placeholder.com/400x800.png?text=Blurred+Background", // Replace with your background image
        }}
        style={styles.backgroundImage}
      >
        {/* Title */}
        <View style={styles.header}>
        <Text style={styles.subtitle}>watch your</Text>
        <Text style={styles.title}>masterpiece</Text>

        </View>

        {/* Video Player Container */}
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
          >
            <Text style={styles.startButtonText}>
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <Pressable
          style={styles.nextButton}
          onPress={async () => {
            await uploadVideoToSupabase(videoUri);
            router.push("/videoFeatures/youdidit");
          }}
        >
          <Text style={styles.nextButtonText}>send</Text>
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
    marginTop: 120,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontFamily: 'Hind_700',
    fontSize: 38,
    color: '#ffffff',
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
  videoContainer: {
    width: 400,
    height: 400,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 1,
  },
  video: {
    flex: 1,
  },
  controlsContainer: {
    padding: 10,
  },
  startButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 60,
  },
  startButtonText: {
    fontSize: 15,
    fontFamily: "Gluten_700Bold",
    color: "black",
  },
  nextButton: {
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    width: "80%",
    maxWidth: 300,
    marginBottom: 50,
  },
  nextButtonText: {
    fontSize: 22,
    fontFamily: "Gluten_700Bold",
    color: "black",
    textAlign: "center",
  },
});