import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  Dimensions,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { supabase } from "../../utils/supabase";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const ReportBug = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert("Missing Info", "Please fill out both fields.");
      return;
    }

    setSubmitting(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      const { error } = await supabase.from("bug_reports").insert([
        {
          user_id: userId,
          subject,
          message,
        },
      ]);

      if (error) {
        console.error("Submission error:", error.message);
        Alert.alert("Error", "Failed to submit. Please try again.");
        return;
      }

      Alert.alert("Thank you!", "Your feedback has been submitted.");
      setSubject("");
      setMessage("");
      router.back();

    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Report a Bug / Suggestion</Text>

        <TextInput
          style={styles.input}
          placeholder="Subject"
          placeholderTextColor="#888"
          value={subject}
          onChangeText={setSubject}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the issue or idea..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={6}
          value={message}
          onChangeText={setMessage}
        />

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>
            {submitting ? "Submitting..." : "Submit"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.08,
    alignItems: "center",
  },
  header: {
    color: "white",
    fontSize: width * 0.07,
    fontFamily: "Gluten_700Bold",
    marginBottom: height * 0.04,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#1A1A1A",
    color: "white",
    fontSize: width * 0.045,
    padding: width * 0.04,
    borderRadius: 10,
    marginBottom: height * 0.02,
    fontFamily: "Hind_700",
    borderWidth: 1,
    borderColor: "#444",
  },
  textArea: {
    height: height * 0.2,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: width * 0.045,
    fontFamily: "Hind_700Bold",
    color: "black",
  },
});

export default ReportBug;
