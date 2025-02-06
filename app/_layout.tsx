import { Stack } from "expo-router";
import { useFonts, Gluten_700Bold } from '@expo-google-fonts/gluten';
import { Hind_700Bold } from '@expo-google-fonts/hind';
import AppLoading from 'expo-app-loading'; 
import { View, Text, useColorScheme } from 'react-native';
import React from 'react';

const RootLayout = () => {
    const [fontsLoaded] = useFonts({
        Gluten_700Bold,
        Hind_700Bold,
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
                      headerTitle: ''
                  }} />
              <Stack.Screen 
                  name="code"
                  options={{
                      headerTitle: () => (
                        <Text style={{ fontFamily: 'Hind_700Bold', color: 'white', fontSize: 20 }}>1/5</Text>
                    ),
                      headerStyle: {
                          backgroundColor: 'black', // Set header background to black
                      },
                      headerTintColor: 'white', // Set header title color to white
                  }} />
          </Stack>
    );
};

export default RootLayout;