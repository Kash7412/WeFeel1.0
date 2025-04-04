import { router } from "expo-router";
import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const YouDidIt = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleNext = () => {
    if (phoneNumber.length > 0) {
      router.push('/code');
    }
  };
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>you did it!</Text>
          <Text style={styles.subtitle}>you sent</Text>
          <Text style={styles.subtitle}>your first</Text>
          <Text style={styles.title}>WeFeel</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={{ justifyContent: 'center', width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
              <Pressable
                onPress={() => router.push("/videoFeatures/Home")}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>next</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "black",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '40%',
  },
  nextButton: {
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    width: "80%",
    maxWidth: 300,
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    color: "black",
    textAlign: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontFamily: 'Gluten_700Bold',
    fontSize: 78,
    color: '#ffffff',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Hind_700',
    fontSize: 60,
    color: '#ffffff',
    lineHeight: 60,
  },
  legalText: {
    fontFamily: 'Hind_700',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 16,
    marginTop: 10,
  },
  legalLink: {
    color: '#888',
    textDecorationLine: 'underline',
  },
  input: {
    flex: 1,
    height: 60,
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    color: '#ffffff',
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'Hind_700Bold',
    borderWidth: 1,
    borderColor: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  nextButtonPressed: {
    backgroundColor: '#444',
  },
});

export default YouDidIt;
