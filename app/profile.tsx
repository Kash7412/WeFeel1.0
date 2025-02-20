import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput, Modal, Button, Platform } from 'react-native';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker"

const Profile: FC = () => {
  const router = useRouter();
  const [name, setName] = useState('John Doe'); // Updated to manage state
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');

  
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

      <View style={styles.section}>
        <Text style={styles.label}>Change Username</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.value}>{name}</Text> {/* Now reflects the state */}
        </Pressable>
      </View>

      <View style={styles.section}>
        <Pressable onPress={pickProfilePicAsync}>
          <Text style={styles.label}>Change Profile Picture</Text>
        </Pressable>
        <Image source={{ uri: profilePic }} style = {styles.image} />
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
