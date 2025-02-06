import { router } from "expo-router";
import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const HomePage = () => {
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
          <Text style={styles.title}>WeFeel</Text>
          <Text style={styles.subtitle}>the world,</Text>
          <Text style={styles.subtitle}>in 60 seconds</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#666"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={15}
            />
            <Pressable 
              style={({pressed}) => [
                styles.nextButton,
                pressed && styles.nextButtonPressed
              ]}
              onPress={() => router.push('/code')}
            >
              <AntDesign name="arrowright" size={24} color="white" />
            </Pressable>
          </View>
          <Text style={styles.legalText}>
            By continuing, you agree to our <Text style={styles.legalLink}>terms of use</Text> and have agreed to our <Text style={styles.legalLink}>privacy policy</Text>.
          </Text>
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
  },
  subtitle: {
    fontFamily: 'Hind_700',
    fontSize: 40,
    color: '#ffffff',
    lineHeight: 48,
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
    width: '80%',
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  nextButton: {
    width: 60,
    height: 60,
    backgroundColor: '#333',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  nextButtonPressed: {
    backgroundColor: '#444',
  },
});

export default HomePage;
