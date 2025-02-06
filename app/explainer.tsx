import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const HowItWorks = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Here's how it works</Text>
        <View style={styles.content}>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>1. </Text>
            Once a day everyone receives a prompt to film their 10 second{" "}
            <Text style={styles.highlight}>WeFeel</Text>
          </Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>2. </Text>
            Once you send yours, we’ll send you 5 to watch
          </Text>
          <Text style={styles.summary}>
            That’s 60 seconds of making the world more connected!
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.note}>
          <Text style={styles.noteHighlight}>note:</Text> your videos can be
          shared. don’t share anything private.
        </Text>
        <Pressable
          onPress={() => router.push("/expectations")}
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
    fontSize: 20,
    fontFamily: "Hind_700",
    color: "white",
    marginBottom: 20,
    lineHeight: 28,
    textAlign: "center", // Centers each step
  },
  stepNumber: {
    fontFamily: "Hind_700Bold",
    color: "white",
  },
  highlight: {
    fontSize: 28,
    fontFamily: "Gluten_700Bold",
    color: "white",
  },
  summary: {
    fontSize: 20,
    fontFamily: "Hind_700",
    color: "white",
    marginBottom: 40,
    textAlign: "center",
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
  note: {
    fontSize: 14,
    fontFamily: "Hind_700",
    color: "white",
    textAlign: "center",
    width: "100%",
    marginBottom: 20,
  },
  noteHighlight: {
    fontSize: 20,
    fontFamily: "Hind_700Bold",
    color: "red",
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

export default HowItWorks;
