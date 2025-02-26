import React, { FC } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

const Settings: FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Settings</Text>

      {/* Options */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable style={styles.option} onPress={() => handleNavigation("/admin/profile")}>
          <Text style={styles.optionText}>Update Profile</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={() => handleNavigation("/report-bug")}>
          <Text style={styles.optionText}>Report a Bug / Make a Suggestion</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={() => handleNavigation("/app-store-review")}>
          <Text style={styles.optionText}>Review Us in the App Store</Text>
        </Pressable>

        <Pressable style={styles.dangerZone} onPress={() => handleNavigation("/dangerzone")}>
          <Text style={styles.dangerText}>Danger Zone</Text>
        </Pressable>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable onPress={() => handleNavigation("/terms")}>
          <Text style={styles.footerText}>Terms & Conditions</Text>
        </Pressable>
        <Pressable onPress={() => handleNavigation("/privacy")}>
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
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  header: {
    color: "white",
    fontSize: 32,
    fontFamily: "Gluten_700Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  option: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#444",
  },
  optionText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Hind_700",
  },
  dangerZone: {
    backgroundColor: "#C65D3B",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  dangerText: {
    color: "black",
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Hind_700",
    color: "#AAAAAA",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Settings;