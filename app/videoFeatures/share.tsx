import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Sharing from "expo-sharing";

const ShareMedia = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const videoUri = Array.isArray(params.uri) ? params.uri[0] : params.uri;

  const shareToPlatform = async (platform: string) => {
    if (videoUri && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(videoUri, {
        mimeType: "video/mp4",
        dialogTitle: `Share via ${platform}`,
      });
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>spread the word</Text>
          <Image source={require("../../assets/share2.png")} style={styles.image} />
        </View>

        {/* Social Media Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => shareToPlatform("Instagram")}>
            <Image source={require("../../assets/insta.png")} style={styles.shareIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shareToPlatform("WhatsApp")}>
            <Image source={require("../../assets/whatsapp.png")} style={styles.shareIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shareToPlatform("Messages")}>
            <Image source={require("../../assets/sms.png")} style={styles.shareIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shareToPlatform("Recent")}>
            <Image source={require("../../assets/recents2.png")} style={styles.shareIcon} />
          </TouchableOpacity>
        </View>

        {/* Done Button */}
        <View style={styles.footer}>
          <Pressable style={styles.readyButton} onPress={() => router.push("/videoFeatures/Home")}> 
            <Text style={styles.readyButtonText}>done</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  header: {
    marginTop: 95,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 35,
    fontFamily: "Hind_700Bold",
    color: "white",
    textAlign: "center",
    lineHeight: 45,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 1,
  },
  image: {
    width: 375,
    height: 500,
    borderRadius: 10,
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  shareIcon: {
    width: 60,
    height: 60,
    marginHorizontal: 12,
  },
  footer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  readyButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: "center",
    width: "90%",
  },
  readyButtonText: {
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    color: "black",
  },
});

export default ShareMedia;
