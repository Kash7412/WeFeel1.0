import React, { FC } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

const Profile: FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Profile</Text>

      {/* Name Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>John Doe</Text> {/* Placeholder value */}
        </View>
      </View>

      {/* Profile Picture Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Profile Picture</Text>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.image}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/terms")}>
          <Text style={styles.footerText}>Terms & Conditions</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/privacy")}>
          <Text style={styles.footerText}>Privacy Policy</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 80, // Moves content higher up
    paddingHorizontal: 24,
    alignItems: "center",
  },
  header: {
    color: "white",
    fontSize: 32,
    fontFamily: "Gluten_700Bold",
    textAlign: "center",
    marginBottom: 30,
  },
  section: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    color: "white",
    fontSize: 18,
    fontFamily: "Hind_700",
    marginBottom: 10,
  },
  valueContainer: {
    width: "90%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#444",
    alignItems: "center",
  },
  value: {
    color: "white",
    fontSize: 18,
    fontFamily: "Hind_700",
    textAlign: "center",
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "#444",
    borderRadius: 80,
    padding: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#444",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Hind_700",
    color: "#AAAAAA",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Profile;