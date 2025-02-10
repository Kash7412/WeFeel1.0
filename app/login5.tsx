import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";

const RecordFirstWeFeel = () => {
  const router = useRouter();

  const handleStartPress = () => {
    router.push("/camera"); // Navigate to the camera page
  };

  const handleReadyPress = () => {
    router.push("/permissions"); // Navigate to permissions page
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Time to record your first WeFeel</Text>
      </View>

      <View style={styles.container}>
      <Image 
        source={require('/Users/Elliot/CascadeProjects/WeFeel1.0/assets/login5image.png')}
        style={styles.image}
      />
    </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Give camera and microphone access
        </Text>
        <Pressable style={styles.readyButton} onPress={handleReadyPress}>
          <Text style={styles.readyButtonText}>I’m Ready</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 24,
    alignItems: "center",
  },
  header: {
    marginTop: 20,
    alignItems: "center",
  },
  stepIndicator: {
    fontSize: 20,
    fontFamily: "Hind_700Bold",
    color: "white",
  },
  title: {
    fontSize: 32,
    fontFamily: "Gluten_700Bold",
    color: "white",
    textAlign: "center",
    marginTop: 10,
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
    borderRadius: 20,
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
    bottom: 20,
    alignItems: "center",
    width: "100%",
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Hind_700",
    color: "white",
    marginBottom: 20,
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
    width: 400,
    height: 500,
    borderRadius: 10,
  }
});

export default RecordFirstWeFeel;
