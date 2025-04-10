import { Stack } from "expo-router";
import { useFonts, Gluten_700Bold } from "@expo-google-fonts/gluten";
import { Hind_700Bold } from "@expo-google-fonts/hind";
import { RedHatDisplay_400Regular } from "@expo-google-fonts/red-hat-display";
import AppLoading from "expo-app-loading";
import { View, Text, useColorScheme } from "react-native";
import React from "react";

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Gluten_700Bold,
    Hind_700Bold,
    RedHatDisplay_400Regular,
  });

  const colorScheme = useColorScheme();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="videoFeatures/Home"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Login/explainer"
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Hind_700Bold",
                color: "white",
                fontSize: 20,
              }}
            >
              2/5
            </Text>
          ),
          headerBackTitle: "2/5",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Login/expectations"
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Hind_700Bold",
                color: "white",
                fontSize: 20,
              }}
            >
              3/5
            </Text>
          ),
          headerBackTitle: "2/5",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Login/login5"
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Hind_700Bold",
                color: "white",
                fontSize: 20,
              }}
            >
              4/5
            </Text>
          ),
          headerBackTitle: "3/5",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Login/name"
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Hind_700Bold",
                color: "white",
                fontSize: 20,
              }}
            >
              2/5
            </Text>
          ),
          headerBackTitle: "1/5",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="videoFeatures/record"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="admin/settings"
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Hind_700Bold",
                color: "white",
                fontSize: 20,
              }}
            >
              Settings
            </Text>
          ),
          headerBackTitle: "Home",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="admin/profile"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="dangerzone"
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Hind_700Bold",
                color: "white",
                fontSize: 20,
              }}
            >
              Danger Zone
            </Text>
          ),
          headerBackTitle: "Settings",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="videoFeatures/youdidit"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="videoFeatures/share"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="videoFeatures/playback"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="videoFeatures/Feed"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="admin/terms"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="admin/privacy"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="admin/report-bug"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
