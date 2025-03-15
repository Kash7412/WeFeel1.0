import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useRouter, useLocalSearchParams} from "expo-router";
import { fetchVideos } from "../../utils/getNewVideos"; // Import video fetching logic
import { useFocusEffect } from "@react-navigation/native"; // Required for detecting page navigation
import { uploadVideoToSupabase } from "../../utils/uploadVideo";
import { supabase } from "../../utils/supabase"; 
const { width, height } = Dimensions.get("window");


// // User profile UI
// const UserProfile = () => {
//   return (
//     <View style={styles.userProfile}>
//       <Image source={require("../../assets/profile.png")} style={styles.profilePic} />
//       <Text style={styles.username}>User123</Text>
//     </View>
//   );
// };

// ✅ **Fixed** Daily Prompt UI (Now properly receives `prompt` as a prop)
const DailyPrompt = ({ prompt }: { prompt: string }) => {
  return (
    <View style={styles.promptContainer}>
      <Text style={styles.promptLabel}>Today's prompt:</Text>
      <Text style={[styles.promptText, { fontSize: width * 0.06, maxWidth: width * 0.85 }]}>
        {prompt}
      </Text>
    </View>
  );
};

export default function Feed() {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<string> | null>(null);
  const videoPlayersRef = useRef<{ [key: string]: any }>({}); // Store player instances
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isUploading, setIsUploading] = useState(false);
  const [prompt, setPrompt] = useState<string>("Loading prompt...");

  useEffect(() => {
    const loadVideos = async () => {
      console.log("📤 Fetching video links...");
      const videoURLs = await fetchVideos();
      console.log("✅ Fetched video URLs:", videoURLs);
      setVideos(videoURLs);
      setLoading(false);
    };

    loadVideos();
    }, []);

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

  // ⏹️ Pause all videos when the user leaves the page
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log("🚨 Pausing all videos as user leaves the Feed page.");
        Object.values(videoPlayersRef.current).forEach((player) => {
          if (player && typeof player.pause === "function") {
            try {
              player.pause();
            } catch (error) {
              console.warn("⚠️ Skipping pause for unmounted player:", error);
            }
          }
        });
      };
    }, [])
  );

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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <VideoCard
              videoUrl={item}
              isActive={index === currentIndex}
              isLast={index === videos.length - 1}
              index={index}
              videoPlayersRef={videoPlayersRef} // Pass down reference to manage players
            />
          )}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setCurrentIndex(viewableItems[0].index ?? 0);
            }
          }}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        />
      )}
      <DailyPrompt prompt={prompt} />
    </ImageBackground>
  );
}

interface VideoCardProps {
  videoUrl: string;
  isActive: boolean;
  isLast: boolean;
  index: number;
  videoPlayersRef: React.MutableRefObject<{ [key: string]: any }>;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl, isActive, isLast, index, videoPlayersRef }) => {
  const player = useVideoPlayer(videoUrl);
  const router = useRouter();

  useEffect(() => {
    videoPlayersRef.current[videoUrl] = player; // Store player reference

    if (isActive) {
      console.log("▶️ Playing video:", videoUrl);
      player.play();
      player.loop = true;
    } else {
      console.log("⏸️ Pausing video:", videoUrl);
      player.pause();
    }

    return () => {
      console.log("🧹 Cleaning up player for:", videoUrl);
      if (player && typeof player.pause === "function") {
        try {
          player.pause();
        } catch (error) {
          console.warn("⚠️ Error pausing unmounted player:", error);
        }
      }
      delete videoPlayersRef.current[videoUrl];
    };
  }, [isActive]);

  const navigateHome = () => {
    router.navigate("/videoFeatures/Home");
  };

  return (
    <View style={styles.videoContainer}>
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
      <Pressable style={styles.backToHomeButton} onPress={navigateHome} disabled={!isLast}>
        <Text style={styles.buttonText}>{isLast ? "Go to Home" : `${index + 1}/${5}`}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  backToHomeButton: {
    justifyContent: "center",
    bottom: 150,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  /** 🔥 "Today's Prompt" - Larger Font */
  promptLabel: {
    fontFamily: "Gluten_700Bold",
    fontSize: width * 0.065, // Increased size
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  /** 🔥 Prompt Text - Smaller with Reduced Line Spacing */
  promptText: {
    fontSize: width * 0.009, // Decreased size
    fontWeight: "bold",
    fontFamily: "Hind_700Bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    color: "white",
    lineHeight: width * 0.074, // Reduced spacing between lines
    textAlign: "center",
    marginTop: 6,
    maxWidth: "80%",
  },
  promptContainer: {
    position: "absolute",
    top: 80,
    right: 20,
    padding: 10,
    borderRadius: 8,
    maxWidth: "60%",
  },
});