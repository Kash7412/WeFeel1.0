import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const Expectations = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>What to expect / how to behave</Text>
        <View style={styles.content}>
          <Text style={styles.step}>
            📷 <Text style={styles.highlight}>interesting stories</Text> from
            around the world
          </Text>
          <Text style={styles.step}>
            😲 maybe even <Text style={styles.highlight}>feelings</Text>
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            No weird stuff. We mean it, you'll instantly get banned
          </Text>
        </View>
        <Text style={styles.moderationText}>
          humans and AI moderate all videos before sharing.
        </Text>
        <Pressable
          onPress={() => router.push("/record")}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>next</Text>
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
  mainContent: {
    alignItems: "center", // Centers horizontally
    marginTop: 20, // Adds spacing from the top of the screen
  },
  title: {
    fontSize: 32,
    fontFamily: "Hind_700Bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center", // Centers the text inside the title
  },
  content: {
    maxWidth: 300, // Restricts content width for readability
    alignItems: "center", // Centers child text horizontally
  },
  step: {
    fontSize: 25,
    fontFamily: "Hind_700",
    color: "white",
    marginBottom: 60,
    lineHeight: 28,
    textAlign: "center", // Centers each step
  },
  highlight: {
    fontSize: 25,
    fontFamily: "Gluten_700Bold",
    color: "white",
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: 0,
  },
  warningContainer: {
    backgroundColor: "#555555",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10, // Space between the warning and the moderation text
  },
  warningText: {
    fontSize: 16,
    fontFamily: "Hind_700",
    color: "black",
    textAlign: "center",
  },
  moderationText: {
    fontSize: 14,
    fontFamily: "Hind_700",
    color: "white",
    marginBottom: 20, // Space between moderation text and the next button
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    width: "80%",
    maxWidth: 300,
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    color: "black",
    textAlign: "center",
  },
});

export default Expectations;
