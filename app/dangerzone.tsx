import React from "react"
import {View, Text, StyleSheet, Pressable } from "react-native";
import {useRouter} from "expo-router";

const DangerZone = () => {
    const router = useRouter();


    return (
        <View style={styles.container}>
    
          <Pressable style={styles.button} onPress={() => console.log('Log out')}>
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
    
          <Pressable style={styles.button} onPress={() => console.log('Archive posts')}>
            <Text style={styles.buttonText}>Archive posts</Text>
          </Pressable>
    
          <Pressable style={styles.button} onPress={() => console.log('Delete account')}>
            <Text style={styles.buttonText}>Delete account</Text>
          </Pressable>
    
          <View style={styles.footer}>
            <Pressable onPress={() => router.push('/terms')}>
              <Text style={styles.footerText}>Terms and Conditions</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/privacy')}>
              <Text style={styles.footerText}>Privacy Policy</Text>
            </Pressable>
          </View>
        </View>
      );      
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 30,
    },
    button: {
      backgroundColor: '#333',
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginVertical: 10,
      borderRadius: 5,
      width: '80%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    footer: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    footerText: {
      color: 'white',
      fontSize: 14,
      marginBottom: 5,
    },
  });

  export default DangerZone