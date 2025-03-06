import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";


const UserProfile = () => {
  return (
    <View style={styles.userProfile}>
      <Image
        source={require("../../assets/profile.png")} // Ensure the correct path
        style={styles.profilePic}
      />
      <Text style={styles.username}>User123</Text>
    </View>
  );
};

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
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index for manual navigation
  const flatListRef = useRef(null); // Ref for the FlatList for programmatically scrolling
  const [activeIndex, setActiveIndex] = useState(null); // Track active video index

  const Width = Dimensions.get('window').width; // Get the screen width
  const Height = Dimensions.get('window').height; // Get the screen width


  useEffect(() => {
    fetchVideos();
  }, []);

  // Function to fetch video URLs from Supabase (Private Bucket with Signed URLs)
  const fetchVideos = async () => {
    try {
      console.log("Fetching video list...");
      const { data, error } = await supabase.storage
        .from("wefeel-videos")
        .list("videos", { limit: 6 });

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
    <ImageBackground
      source={{ uri: "https://via.placeholder.com/400x800.png?text=Blurred+Background" }}
      style={styles.backgroundImage}
    >
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={videos}
          pagingEnabled
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <VideoCard videoUrl={item} isActive={index === currentIndex} />
          )}
          style={{ marginVertical: 0, padding: 0 }}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setCurrentIndex(viewableItems[0].index);  // Update the current index to the visible video
            }
          }}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50  // Adjust as needed
          }}
        />
      )}
      <UserProfile /> 
      <DailyPrompt />  // Add the DailyPrompt component


    </ImageBackground>
  );
}

const VideoCard = ({ videoUrl, isActive }) => {
  const player = useVideoPlayer(videoUrl);

  useEffect(() => {
    if (isActive) {
      player.play();
      player.loop = true;  // Start playing when the video is active
    } else {
      player.pause(); // Ensure the video is paused when not active
    }
  }, [isActive]);

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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    color: 'black'
  },
  userProfile: {
    position: 'absolute',
    top: 100,  // Keep the top padding to maintain vertical positioning
    left: 20,  // Change from right to left for left-side alignment
    flexDirection: 'row',  // Elements are side by side
    alignItems: 'center',  // Align items vertically within the container
    borderRadius: 25,
    padding: 8,
  },
  profilePic: {
    width: 50,  // Adjust size as needed
    height: 50,  // Adjust size as needed
    borderRadius: 25,  // Makes the image round
    marginRight: 15
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'grey',  // Shadow color that will act as the outline
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 5,
  },
  noVideosText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  videoContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // You can set this to any color that matches the "window frame" color
    paddingVertical: 0, // Ensure no padding is causing gaps
    margin: 0, // Ensure no margin is causing gaps
  },
  video: {
    width: '100%',
    height: '100%',
  },
  promptContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
    padding: 10,
    borderRadius: 8,
    maxWidth: '40%',  // Adjust based on your layout needs
  },
  promptText: {
    fontWeight: 'bold',
    fontFamily: 'Gluten_700Bold',
    fontSize: 32,
    textShadowColor: 'black',  // Shadow color that will act as the outline
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 5,
    color: 'white'
  },
  prompt: {
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Gluten_700Bold',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    color: 'white'
  },
});