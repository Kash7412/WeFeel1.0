import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../utils/supabase";
import type { User } from '@supabase/supabase-js';

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
        router.replace("/videoFeatures/Feed"); // Redirect signed-in users directly to feed
      }
    };

    checkUser();
  }, []);

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

      <Pressable style={styles.button} onPress={() => router.push("/Login/name")}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.secondaryButton]} onPress={() => router.push("/videoFeatures/Feed")}>
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