import React, { useEffect, useState, useRef } from "react";
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
import { useRouter } from "expo-router";
import { fetchVideos } from "../../utils/getNewVideos"; // Import video fetching logic
import { useFocusEffect } from "@react-navigation/native"; // Required for detecting page navigation

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

export default function Feed() {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<string> | null>(null);
  const videoPlayersRef = useRef<{ [key: string]: any }>({}); // Store player instances

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
      <UserProfile />
      <DailyPrompt />
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
        <Text style={styles.buttonText}>{isLast ? "Go to Home" : `${index + 1}/${6}`}</Text>
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
});