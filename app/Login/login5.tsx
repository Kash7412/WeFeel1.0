import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";

const RecordFirstWeFeel = () => {
  const router = useRouter();

  const handleStartPress = () => {
    router.push("/camera"); // Navigate to the camera page
  };

  const handleReadyPress = () => {
    router.push("/videoFeatures/record"); // Navigate to permissions page
  };

  const handleSettingPress = () => {
    router.push("/admin/settings");// For Demoing settings
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Time to record your first WeFeel</Text>
      </View>

      <View style={styles.container}>
        <Image
          source={require("../../assets/login5image.png")}
          style={styles.image}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>give camera and microphone access</Text>
        <Pressable style={styles.readyButton} onPress={handleReadyPress}>
          <Text style={styles.readyButtonText}>i’m ready</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 18,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  stepIndicator: {
    fontSize: 20,
    fontFamily: "Hind_700Bold",
    color: "white",
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
    marginBottom: 20,
  },
  promptContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  promptText: {
    fontSize: 24,
    fontFamily: "Hind_700Bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  cameraPlaceholder: {
    width: 200,
    height: 250,
    backgroundColor: "#1E1E1E",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 36,
    fontFamily: "Hind_700Bold",
    color: "white",
  },
  startButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: "center",
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    color: "black",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    width: "100%",
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Hind_700",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  readyButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: "center",
  },
  readyButtonText: {
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    color: "black",
  },
  image: {
    width: 405,
    height: 495,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  settingsButton: {
    padding: 10,
    marginRight: 20,
  },
  settingsButtonText: {// for demoing settings pages
    fontSize: 24,
    color: "white",
  },
});

export default RecordFirstWeFeel;
