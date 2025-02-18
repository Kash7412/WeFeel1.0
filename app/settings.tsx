import React, { FC } from "react"
import {View, ScrollView, Text, StyleSheet, Pressable } from "react-native";
import {useRouter} from "expo-router";


const Settings: FC = () => {
    const router = useRouter();
  
    const handleNavigation = (path: string) => {
      router.push(path);
    };
  
    return (
      <ScrollView style={styles.container}>
        <Pressable style={styles.option} onPress={() => handleNavigation('/profile')}>
          <Text style={styles.optionText}>update profile</Text>
        </Pressable>
        <Pressable style={styles.option} onPress={() => handleNavigation('/report-bug')}>
          <Text style={styles.optionText}>report a bug / make a suggestion</Text>
        </Pressable>
        <Pressable style={styles.option} onPress={() => handleNavigation('/app-store-review')}>
          <Text style={styles.optionText}>review us in the app store</Text>
        </Pressable>
        <Pressable style={styles.option} onPress={() => handleNavigation('/dangerzone')}>
          <Text style={styles.optionText}>danger zone</Text>
        </Pressable>
  
        <View style={styles.footer}>
          <Pressable onPress={() => handleNavigation('/terms')}>
            <Text style={styles.footerText}>terms & conditions</Text>
          </Pressable>
          <Pressable onPress={() => handleNavigation('/privacy')}>
            <Text style={styles.footerText}>privacy policy</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      padding: 20,
    },
    header: {
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
    },
    option: {
      backgroundColor: 'transparent',
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      paddingBottom: 15,
      marginBottom: 15,
    },
    optionText: {
      color: 'white',
      fontSize: 18,
    },
    footer: {
        position: "absolute",
        bottom: 20,
        alignItems: "center",
        width: "100%",
      },
      footerText: {
        fontSize: 14,
        fontFamily: "Hind_700",
        color: "white",
        marginBottom: 20,
        textAlign: "center",
      },
  });

  export default Settings