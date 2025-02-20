import React, { FC } from "react";
import { View, ScrollView, Text, StyleSheet, Pressable, SafeAreaView, Alert } from "react-native";
import { useRouter, Router } from "expo-router";

const Settings: FC = () => {
    const router: Router = useRouter();

    const handleNavigation = (path: string): void => {
        router.push(path);
    };

    const handleDeleteAccount = (): void => {
      Alert.alert(
          "Delete Account",
          "Are you sure you want to delete your account? This action cannot be undone.",
          [
              {
                  text: "Cancel",
                  style: "cancel"
              },
              {
                  text: "Delete",
                  onPress: () => console.log("Delete Account"), // Add actual delete logic here
                  style: "destructive"
              }
          ]
      );
    };

    const handleLogout = (): void => {
        // TODO: Implement the actual logout functionality here
        console.log("Placeholder for logout logic");
        Alert.alert("Logged Out", "You have been successfully logged out.", [
            { text: "OK",
              onPress: () => console.log("Logout confirmed") }
        ]);
    };
  

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Pressable style={styles.option} onPress={() => handleNavigation('/profile')}>
                    <Text style={styles.optionText}>Update Profile</Text>
                </Pressable>
                <Pressable style={styles.option} onPress={() => handleNavigation('/report-bug')}>
                    <Text style={styles.optionText}>Report a Bug / Make a Suggestion</Text>
                </Pressable>
                <Pressable style={styles.option} onPress={() => handleNavigation('/app-store-review')}>
                    <Text style={styles.optionText}>Review Us in the App Store</Text>
                </Pressable>
                <Pressable style={styles.option} onPress={() => handleLogout()}>
                    <Text style={styles.optionText}>Log Out</Text>
                </Pressable>
                <Pressable style={styles.option} onPress={() => handleDeleteAccount()}>
                    <Text style={styles.optionText}>Delete Account</Text>
                </Pressable>
            </ScrollView>
            <View style={styles.footer}>
                <Pressable onPress={() => handleNavigation('/terms')}>
                    <Text style={styles.footerText}>Terms & Conditions</Text>
                </Pressable>
                <Pressable onPress={() => handleNavigation('/privacy')}>
                    <Text style={styles.footerText}>Privacy Policy</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingTop: 10
    },
    option: {
        backgroundColor: 'transparent',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginBottom: 15,
    },
    optionText: {
        color: 'white',
        fontSize: 18,
    },
    footer: {
        paddingVertical: 20,
        alignItems: "center",
        width: "100%",
    },
    footerText: {
        fontSize: 14,
        fontFamily: "Hind_700Bold",
        color: "white",
        textAlign: "center",
    },
});

export default Settings;
