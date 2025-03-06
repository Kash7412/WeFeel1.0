import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import Camera, {
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import type { CameraRecordingOptions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

const Record = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [countdown, setCountdown] = useState(5);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [cam, setCam] = useState<CameraView>();
  const [videoUriPromise, setVideoUriPromise] = useState<Promise<any>>();
  const router = useRouter();

  const [facing, setFacing] = useState<CameraType>("back");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountdownActive && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown == 0 && cam) {
      console.log("countdown done");
      cam.stopRecording();
      videoUriPromise
        ?.then(({ uri }) => {
          console.log(uri);
          router.push({ pathname: `/videoFeatures/playback`, params: { uri: uri } });
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return () => clearTimeout(timer); // Cleanup the timer
  }, [isCountdownActive, countdown, cam]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to access the camera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleStart = () => {
    setIsCountdownActive(true);
    setCountdown(5); // Reset countdown when "start" is pressed
    if (cam && cam.recordAsync) {
        setVideoUriPromise(cam.recordAsync());
    } else {
        console.error("Camera is not initialized or does not have recordAsync method");
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://via.placeholder.com/400x800.png?text=Blurred+Background", // Replace with your background image
        }}
        style={styles.backgroundImage}
      >
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>tell the world how you really feel!</Text>
        </View>

        {/* Camera Rectangle */}
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={(ref) => { if (ref !== null && ref !== undefined) setCam(ref); }}
            mode="video"
          >
            <View style={styles.overlay}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.flipButtonText}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>

        {/* Countdown Badge */}
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
          <Pressable onPress={() => router.push('/videoFeatures/youdidit')}>
              <Text style={styles.badgeText}>
              {countdown > 0 ? countdown : "Done"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
          disabled={isCountdownActive && countdown > 0} // Disable during countdown
        >
          <Text style={styles.startButtonText}>
            {isCountdownActive && countdown > 0 ? "Running..." : "start"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  header: {
    marginTop: 120,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: "Hind_700Bold",
    fontSize: 35,
    color: "white",
    textAlign: "center",
    lineHeight: 45,
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
  cameraContainer: {
    width: 350, // Width of the camera rectangle
    height: 450, // Height of the camera rectangle
    borderRadius: 40,
    overflow: "hidden", // Clips anything outside the rectangle
    marginTop: 1,
  },
  camera: {
    flex: 1, // Ensures the camera fills the container
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  flipButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  flipButtonText: {
    fontSize: 16,
    fontFamily: "Hind_700Bold",
    color: "black",
  },
  badgeContainer: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  badge: {
    backgroundColor: "red",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  badgeText: {
    fontSize: 18,
    fontFamily: "Hind_700Bold",
    color: "white",
  },
  startButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginBottom: 50,
  },
  startButtonText: {
    fontSize: 20,
    fontFamily: "Gluten_700Bold",
    color: "black",
  },
  permissionText: {
    fontSize: 16,
    fontFamily: "Hind_700",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  permissionButtonText: {
    fontSize: 16,
    fontFamily: "Hind_700Bold",
    color: "black",
  },
});

export default Record;
