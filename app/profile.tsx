import React, { FC } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from "expo-router";

const Profile: FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <View style={styles.section}>
        <Text style={styles.label}>name</Text>
        <Text style={styles.value}>John Doe</Text> {/* Placeholder value */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>profile picture</Text>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.push('/terms')}>
          <Text style={styles.footerText}>terms & conditions</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/privacy')}>
          <Text style={styles.footerText}>privacy policy</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      padding: 20,
      alignItems: 'center',
    },
    header: {
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    section: {
      width: '100%',
      marginBottom: 20,
    },
    label: {
      color: 'white',
      fontSize: 18,
      marginBottom: 10,
    },
    value: {
      color: 'white',
      fontSize: 18,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'white',
      padding: 10,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    footer: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footerText: {
      color: 'white',
      fontSize: 16,
    },
  });
  

export default Profile;
