import { router, Stack } from "expo-router"
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native"
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

const Name = () => {
    const [userName, setUserName] = useState('');

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
                        placeholderTextColor="rgba(169, 169, 169, 0.5)"  // Gray color for placeholder
                    />
                    <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.legalText}>
                            by tapping next, you're confirming you're over the age of 14.
                        </Text>
                        <Pressable 
                            style={({ pressed }) => [
                                styles.nextButton,
                                pressed && styles.nextButtonPressed,
                                { width: '90%', padding: 15, borderRadius: 30 }  // Rounded edges
                            ]}
                            onPress={() => router.push('/explainer')}
                        >
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontFamily: 'Hind_700'}}>next</Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    inputContainer: {
      width: '80%',
      marginBottom: 40,
    },
    legalText: {
        fontFamily: 'Hind_700',
        fontSize: 19,
        color: '#666',
        paddingHorizontal: 10,
        lineHeight: 22,
        marginBottom: 20,
        marginLeft: 20,
        textAlign: 'left',
        width: '100%',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: 10,
    },
    nextButton: {
      backgroundColor: '#333',
      borderRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0,
      borderColor: '#444',
      padding: 15, 
      height: 60,
      width: '90%',
      marginBottom: 25,
    },
    nextButtonPressed: {
      backgroundColor: '#444',
    },
  });

export default Name;