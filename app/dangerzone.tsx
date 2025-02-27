import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

const DangerZone = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Danger Zone</Text>

      {/* Options */}
      <Pressable style={styles.option} onPress={() => console.log("Log out")}>
        <Text style={styles.optionText}>
          <Text style={styles.dangerText}>Log Out</Text>
        </Text>
      </Pressable>

      <Pressable style={styles.option} onPress={() => console.log("Archive posts")}>
        <Text style={styles.optionText}>
          <Text style={styles.warningText}>Archive Posts</Text>
        </Text>
      </Pressable>

      <Pressable style={styles.option} onPress={() => console.log("Delete account")}>
        <Text style={styles.optionText}>
          <Text style={styles.dangerText}>Delete Account</Text>
        </Text>
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/terms")}>
          <Text style={styles.footerText}>Terms & Conditions</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/privacy")}>
          <Text style={styles.footerText}>Privacy Policy</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 80, // Moves content higher up
    paddingHorizontal: 24,
    justifyContent: "flex-start",
  },
  header: {
    color: "white",
    fontSize: 32,
    fontFamily: "Gluten_700Bold",
    textAlign: "center",
    marginBottom: 30,
  },
  option: {
    borderBottomColor: "#444", // Subtle divider between options
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  optionText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Hind_700",
    textAlign: "center",
  },
  dangerText: {
    color: "#C65D3B", // Red for critical actions
  },
  warningText: {
    color: "#FFA500", // Orange for less severe actions
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#444",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Hind_700",
    color: "#AAAAAA",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default DangerZone;