import React, { FC } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";

const { width, height } = Dimensions.get("window");

const Settings: FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleDeleteAccount = (): void => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return Alert.alert("Error", "User not found.");
            const { error } = await supabase.auth.admin.deleteUser(user.id);
            if (error) return Alert.alert("Error", error.message);
            router.replace("/");
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleLogout = (): void => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          onPress: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Alert.alert("Logout Failed", error.message);
            } else {
              router.replace("/");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleReviewApp = () => {
    const appStoreURL = "https://apps.apple.com/app/idYOUR_APP_ID"; // Replace with your actual App Store URL
    Linking.openURL(appStoreURL).catch(() =>
      Alert.alert("Error", "Unable to open App Store.")
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable style={styles.option} onPress={() => handleNavigation("/admin/profile")}>
          <Text style={styles.optionText}>Update Profile</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={() => handleNavigation("/admin/report-bug")}>
          <Text style={styles.optionText}>Report a Bug / Make a Suggestion</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={handleReviewApp}>
          <Text style={styles.optionText}>Review Us in the App Store</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
        </Pressable>

        <Pressable style={styles.option} onPress={() => Alert.alert("Coming Soon", "Notification permissions will be added shortly.")}>
          <Text style={styles.optionText}>Allow Notifications</Text>
        </Pressable>

        <Pressable style={styles.dangerZone} onPress={handleDeleteAccount}>
          <Text style={styles.dangerText}>Delete Account</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={() => handleNavigation("/admin/terms")}>
          <Text style={styles.footerText}>Terms & Conditions</Text>
        </Pressable>
        <Pressable onPress={() => handleNavigation("/admin/privacy")}>
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
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.06,
  },
  header: {
    color: "white",
    fontSize: width * 0.085,
    fontFamily: "Gluten_700Bold",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: height * 0.015,
  },
  option: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: "#444",
  },
  optionText: {
    color: "white",
    fontSize: width * 0.045,
    fontFamily: "Hind_700",
  },
  dangerZone: {
    backgroundColor: "#C65D3B",
    borderRadius: 12,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  dangerText: {
    color: "black",
    fontSize: width * 0.045,
    fontFamily: "Hind_700Bold",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.025,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  footerText: {
    fontSize: width * 0.035,
    fontFamily: "Hind_700",
    color: "#AAAAAA",
    marginBottom: height * 0.01,
    textAlign: "center",
  },
});

export default Settings;
