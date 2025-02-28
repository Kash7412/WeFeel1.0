import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { useRouter } from "expo-router";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "../utils/supabase";
import type { User } from "@supabase/supabase-js";

const LandingPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (user) {
        router.replace("/videoFeatures/Home"); // Redirect signed-in users directly to feed
      }
    };

    checkUser();
  }, []);

  // 🔹 Apple Sign-In Handler
  const handleAppleSignIn = async (redirectPath: string) => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        Alert.alert("Sign-in Failed", "No identity token returned.");
        return;
      }

      console.log("Apple Credential:", credential);

      // 🔹 Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken,
      });

      if (error) {
        Alert.alert("Sign-in Failed", error.message);
        return;
      }

      console.log("Supabase Auth Response:", data);
      setUser(data.user);

      // Redirect based on which button was pressed
      router.replace(redirectPath);

    } catch (error) {
      console.error("Apple Sign-In Error:", error);
      Alert.alert("Error", "Something went wrong with Apple Sign-In.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WeFeel</Text>
      <Text style={styles.subtitle}>Experience the world in 60 seconds</Text>

      {/* Sign Up (Leads to the onboarding/initiation process) */}
      <Pressable style={styles.button} onPress={() => handleAppleSignIn("/Login/name")}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      {/* Log In (Leads straight to home) */}
      <Pressable style={[styles.button, styles.secondaryButton]} onPress={() => handleAppleSignIn("/videoFeatures/Home")}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Log In</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    fontFamily: "Gluten_700Bold",
    fontSize: 42,
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Hind_700",
    fontSize: 22,
    color: "#aaa",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    color: "black",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
  },
  secondaryButtonText: {
    color: "white",
  },
});

export default LandingPage;