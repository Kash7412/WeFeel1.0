import { router } from "expo-router";
import { View, Text, KeyboardAvoidingView, Platform, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

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

    const handleEnterPress = () => {
        router.push('/explainer');
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View style={styles.textContainer}>
                <Text style={styles.subtitle}>Enter Code</Text>
                <Text style={styles.subtitle2}>Code sent to (872) 803-4275</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={verificationCode}
                    onChangeText={handleChange}
                    placeholder="###-###"
                    keyboardType="numeric"
                    maxLength={7} // 6 digits + 1 dash
                />
                <Pressable 
                    style={({ pressed }) => [
                        styles.nextButton,
                        pressed && styles.nextButtonPressed
                    ]}
                    onPress={handleEnterPress}
                >
                    <AntDesign name="arrowright" size={24} color="white" />
                </Pressable>
            </View>
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
    textContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: 40,
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
        lineHeight: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginTop: '30%',
        gap: 10,
    },
    input: {
        flex: 1,
        height: 60,
        backgroundColor: '#1E1E1E',
        borderRadius: 25,
        color: '#ffffff',
        paddingHorizontal: 20,
        fontSize: 20,
        fontFamily: 'Hind_700Bold',
        borderWidth: 1,
        borderColor: '#333',
        textAlign: 'center',
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
