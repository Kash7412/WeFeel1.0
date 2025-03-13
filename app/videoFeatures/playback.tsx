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
import { supabase } from "../../utils/supabase"; // ✅ Import Supabase client

export default function Playback() {
  const { width, height } = useWindowDimensions(); // ✅ Get screen size dynamically
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isUploading, setIsUploading] = useState(false);
  const [prompt, setPrompt] = useState<string>("Loading prompt..."); // ✅ Initial state for prompt

  const videoUri = useMemo(() => {
    return Array.isArray(params.uri) ? params.uri[0] : params.uri;
  }, [params.uri]);

  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
    player.play();
  });

  // ✅ Fetch "Prompt of the Day" from Supabase
  useEffect(() => {
    const fetchPromptOfTheDay = async () => {
      const today = new Date().toISOString().split("T")[0];

      let { data: existingPrompt, error } = await supabase
        .from("prompt_of_the_day")
        .select("prompt_id")
        .eq("date", today)
        .single();

      if (error || !existingPrompt) {
        console.error("Error fetching today's prompt:", error?.message);
        setPrompt("Error loading prompt");
        return;
      }

      let { data: promptData, error: promptError } = await supabase
        .from("prompts")
        .select("text")
        .eq("id", existingPrompt.prompt_id)
        .single();

      if (promptError || !promptData) {
        console.error("Error fetching prompt text:", promptError?.message);
        setPrompt("Error loading prompt");
        return;
      }

      setPrompt(promptData.text ?? "Error loading prompt"); // ✅ Set the prompt text
    };

    fetchPromptOfTheDay();
  }, []);

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
        {/* Header Section (Title + Prompt) */}
        <View style={[styles.header, { marginTop: height * 0.08 }]}>
          <Text style={[styles.subtitle, { fontSize: width * 0.08, lineHeight: width * 0.1 }]}>
            watch your
          </Text>
          <Text style={[styles.title, { fontSize: width * 0.09, lineHeight: width * 0.11 }]}>
            masterpiece
          </Text>

          {/* ✅ Prompt of the Day Section */}
          <Text style={[styles.promptText, { fontSize: width * 0.06, maxWidth: width * 0.85 }]}>
            {prompt}
          </Text>
        </View>

        {/* Video Player (Shifted Higher) */}
        <View style={[styles.videoContainer, { width: width * 0.95, height: height * 0.42 }]}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>

        {/* Uploading Spinner */}
        {isUploading && <ActivityIndicator size="large" color="white" style={styles.loadingSpinner} />}

        {/* Send Button (Shifted Higher) */}
        <Pressable style={[styles.nextButton, { width: width * 0.85, marginTop: height * 0.02 }]} onPress={handleSend} disabled={isUploading}>
          <Text style={[styles.nextButtonText, { fontSize: width * 0.06 }]}>
            {isUploading ? "Uploading..." : "Send"}
          </Text>
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
    paddingHorizontal: "5%",
    alignItems: "center",
  },
  subtitle: {
    fontFamily: "Hind_700",
    color: "#ffffff",
  },
  title: {
    fontFamily: "Gluten_700Bold",
    color: "white",
    textAlign: "center",
    marginTop: "1.5%",
    marginBottom: "3%",
  },
  /* ✅ Updated Styles for Prompt */
  promptLabel: {
    fontFamily: "Gluten_700Bold",
    color: "white",
    marginTop: "3%",
    textAlign: "center",
  },
  promptText: {
    fontFamily: "Hind_700",
    color: "white",
    textAlign: "center",
    marginTop: "1.5%",
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
    marginVertical: "3%",
  },
  nextButton: {
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "4%",
    maxWidth: "85%",
    marginBottom: "6%",
  },
  nextButtonText: {
    fontFamily: "Gluten_700Bold",
    color: "black",
    textAlign: "center",
  },
});
