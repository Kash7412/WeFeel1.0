import { router } from "expo-router";
import { 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  TextInput, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Pressable, 
  Alert 
} from "react-native";
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { supabase } from "../../utils/supabase";

const Name = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!userName.trim()) {
      Alert.alert("Error", "Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      // Get the logged-in user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("User not found. Please sign in again.");
      }

      // Upload name to Supabase
      const { error } = await supabase
        .from("profiles")
        .upsert([{ id: user.id, name: userName }], { onConflict: "id" });

      if (error) throw error;

      // Navigate to the next screen after saving the name
      router.push('/Login/explainer');

    } catch (error: any) {
      console.error("Error saving name:", error);
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}  // Adjust offset for iOS
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={{ position: 'absolute', top: 10, left: 20 }}>
            <Text style={styles.subtitle}>what's your name?</Text>
          </View>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="steve jobs"
            placeholderTextColor="rgba(169, 169, 169, 0.5)"
          />
          <View style={styles.footer}>
            <Text style={styles.legalText}>
              by tapping next, you're confirming you're over the age of 14.
            </Text>
            <Pressable 
              style={({ pressed }) => [
                styles.nextButton,
                pressed && styles.nextButtonPressed
              ]}
              onPress={handleNext}
              disabled={loading}
            >
              <Text style={styles.nextButtonText}>
                {loading ? "Saving..." : "next"}
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "black",
  },
  subtitle: {
    fontFamily: 'Hind_700',
    fontSize: 40,
    color: '#ffffff',
    lineHeight: 48,
  },
  input: {
    height: 70,
    marginTop: '25%',
    color: '#ffffff',
    paddingVertical: 5,
    fontSize: 30,
    fontFamily: 'Hind_700',
    borderWidth: 1,
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legalText: {
    fontFamily: 'Hind_700',
    fontSize: 19,
    color: '#666',
    paddingHorizontal: 10,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
  },
  nextButton: {
    backgroundColor: '#333',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15, 
    height: 60,
    width: '90%',
    marginBottom: 25,
  },
  nextButtonPressed: {
    backgroundColor: '#444',
  },
  nextButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Hind_700'
  },
});

export default Name;