import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, TextInput, Modal, Button, Platform } from 'react-native';
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker"


const Profile: FC = () => {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [name, setName] = useState('John Doe'); // Updated to manage state
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility


  const pickProfilePicAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled){
      setProfilePic(result.assets[0].uri)
      console.log(result);
    } else{
      alert("You did not select any image.");
    }
  };

  return (

    <View style={styles.container}>
            {/* Modal for changing the name */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change your name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              autoFocus
            />
            <Button
              title="Save"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
      {/* Header */}
      <Text style={styles.header}>Profile</Text>

      {/* Name Section */}
      <View style={styles.section}>
      <Text style={styles.label}>Name</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.value}>{name}</Text> {/* Now reflects the state */}
        </Pressable>
      </View>

      {/* Profile Picture Section */}
      <View style={styles.section}>
      <Pressable onPress={pickProfilePicAsync}>
          <Text style={styles.label}>Profile Picture</Text>
        </Pressable>
        <Image source={{ uri: profilePic }} style = {styles.image} />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  input: {
    width: 200,
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  }
});

export default Profile;