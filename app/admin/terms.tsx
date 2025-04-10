import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Terms = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Terms & Conditions</Text>
      <Text style={styles.text}>
        By using this app, you agree to comply with our terms and conditions.
        This includes being respectful to others, using the app for personal and non-commercial use,
        and not engaging in prohibited behavior. We reserve the right to suspend accounts
        that violate these rules.
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
    marginTop: height * 0.04,
    fontSize: width * 0.07,
    fontFamily: "Gluten_700Bold",
    marginBottom: height * 0.02,
  },
  text: {
    color: "#ccc",
    marginTop: height * 0.01,
    fontSize: width * 0.045,
    fontFamily: "Hind_700",
    lineHeight: 24,
  },
});

export default Terms;