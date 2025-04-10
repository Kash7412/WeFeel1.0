import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Privacy = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.text}>
        Your privacy is important to us. We collect only the necessary data
        to provide a better experience and never sell your information.
        By using this app, you consent to our data collection and usage practices.
        You may request to delete your data at any time.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: width * 0.06,
  },
  content: {
    paddingTop: height * 0.06,
    paddingBottom: height * 0.1,
  },
  header: {
    color: "white",
    fontSize: width * 0.07,
    fontFamily: "Gluten_700Bold",
    marginBottom: height * 0.02,
    marginTop: height * 0.04,
  },
  text: {
    color: "#ccc",
    fontSize: width * 0.045,
    fontFamily: "Hind_700",
    lineHeight: 24,
    marginTop: height * 0.01,
  },
});

export default Privacy;
