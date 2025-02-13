import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";

const HowItWorks = () => {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={{ position: "absolute", top: 10, left: 20 }}>
        <Text style={styles.subtitle}>
          here's how it works
        </Text>
      </View>
        <View style={styles.content}>
          <Text style={styles.step}>
            1. Once a day everyone receives a prompt to film their 10 second{" "}
            <Text style={styles.highlight}>WeFeel</Text>
          </Text>
          <Text style={styles.step}>
            2. Once you send yours, we’ll send you 5 to watch
          </Text>
          </View>
          <View>
          <Text style={styles.summary}>
            That’s 60 seconds of making the world more connected!
          </Text>
          </View>

        
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.note}>
          <Text style={styles.noteHighlight}>note: your videos can be shared. don’t share anything private.</Text> 
        </Text>
        <Pressable
          onPress={() => router.push("/expectations")}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "black",
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
  subtitle: {
    fontFamily: "Hind_700",
    fontSize: 40,
    color: "#ffffff",
    lineHeight: 36,
    marginTop: 20,
  },
  content: {
    maxWidth: 300,
    marginTop: 110, // Restricts content width for readability
    alignItems: "center", // Centers child text horizontally
  },
  step: {
    fontSize: 24,
    fontFamily: "Hind_700",
    color: "white",
    marginBottom: 20,
    lineHeight: 30,
    textAlign: "left", // Centers each step
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
    fontSize: 30,
    fontFamily: "Hind_700",
    color: "white",
    marginBottom: 40,
    textAlign: "left",
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
    fontSize: 16,
    fontFamily: "Hind_700",
    color: "white",
    textAlign: "center",
    width: "100%",
    marginBottom: 10,
    lineHeight: 22,
  },
  noteHighlight: {
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    color: "#C65D3B",
  },
  nextButton: {
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    width: "80%",
    maxWidth: 300,
    marginBottom: 27,
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    color: "black",
    textAlign: "center",
  },
});

export default HowItWorks;
