import { Stack } from "expo-router"
import { View, Text, KeyboardAvoidingView, Platform, TextInput } from "react-native"
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Code = () => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleChange = (text: string) => {
        // Ensure the format is ###-###
        const formattedText = text.replace(/[^0-9]/g, '').slice(0, 6);
        if (formattedText.length > 3) {
            setVerificationCode(`${formattedText.slice(0, 3)}-${formattedText.slice(3)}`);
        } else {
            setVerificationCode(formattedText);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View style={{ position: 'absolute', top: 10, left: 20 }}>
                <Text style={styles.subtitle}>enter code</Text>
                <Text style={styles.subtitle2}>code sent to (872) 803-4275</Text>
            </View>
            <TextInput
                style={styles.input}
                value={verificationCode}
                onChangeText={handleChange}
                placeholder="###-###"
                keyboardType="numeric"
                maxLength={7} // 6 digits + 1 dash
            />
872        </KeyboardAvoidingView>
    )
};

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
    subtitle2: {
      fontFamily: 'Hind_700',
      fontSize: 16,
      color: '#ffffff',
      lineHeight: 48,
    },
    input: {
      flex: 1,
      height: 20,
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

export default Code;