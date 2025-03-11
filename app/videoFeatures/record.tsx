import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  useWindowDimensions
} from "react-native";
import { useRouter } from "expo-router";
import Camera, {
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utils/supabase"; // Ensure you have a Supabase client configured

const Record = () => {
  const { width, height } = useWindowDimensions();
  const [permission, requestPermission] = useCameraPermissions();
  const [countdown, setCountdown] = useState(5);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [cam, setCam] = useState<CameraView>();
  const [videoUriPromise, setVideoUriPromise] = useState<Promise<any>>();
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");

  // State for prompt
  const [prompt, setPrompt] = useState("Loading prompt...");

  useEffect(() => {
    fetchPromptOfTheDay();
  }, []);

  // Fetch Prompt of the Day
  const fetchPromptOfTheDay = async () => {
    const today = new Date().toISOString().split("T")[0]; // Get the current date (YYYY-MM-DD)
  
    // 1️⃣ Check if there's already a stored prompt for today
    let { data: existingPrompt, error } = await supabase
      .from("prompt_of_the_day")
      .select("prompt_id")
      .eq("date", today)
      .single(); // Fetch only one row (today's prompt)
  
    if (error && error.code !== "PGRST116") {
      console.error("Error fetching today's prompt:", error.message);
      setPrompt("Error loading prompt");
      return;
    }
  
    // 2️⃣ If a prompt exists, fetch its text from the `prompts` table
    if (existingPrompt) {
      let { data: promptData, error: promptError } = await supabase
        .from("prompts")
        .select("text")
        .eq("id", existingPrompt.prompt_id)
        .single();
  
      if (promptError || !promptData) {
        console.error("Error fetching prompt text:", promptError?.message || "Prompt not found");
        setPrompt("Error loading prompt");
        return;
      }
  
      setPrompt(promptData.text ?? "Error loading prompt"); // ✅ Safe null check
      return; // ✅ Exit function since we already have today's prompt
    }
  
    // 3️⃣ If no prompt exists for today, pick a new one
    let { data: allPrompts, error: fetchError } = await supabase
      .from("prompts")
      .select("id, text");
  
    if (fetchError || !allPrompts || allPrompts.length === 0) {
      console.error("Error fetching prompts:", fetchError?.message || "No prompts found");
      setPrompt("No prompts available.");
      return;
    }
  
  // 4️⃣ Select a new prompt using day-based cycling (Fix: Use .getTime() for date subtraction)
  const startDate = new Date("2025-01-01").getTime(); // Convert to timestamp
  const todayDate = new Date().getTime(); // Convert current date to timestamp

  const daysSinceStart = Math.floor((todayDate - startDate) / (1000 * 60 * 60 * 24));

  const selectedPrompt = allPrompts[daysSinceStart % allPrompts.length];
  
    // 5️⃣ Store the new prompt in `prompt_of_the_day`
    const { error: insertError } = await supabase.from("prompt_of_the_day").insert([
      { prompt_id: selectedPrompt.id, date: today }
    ]);
  
    if (insertError) {
      console.error("Error saving new prompt:", insertError.message);
    }
  
    setPrompt(selectedPrompt.text ?? "Error loading prompt"); // ✅ Safe null check
  };
  

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountdownActive && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0 && cam) {
      console.log("Countdown done");
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

    return () => clearTimeout(timer);
  }, [isCountdownActive, countdown, cam]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>We need your permission to access the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleStart = () => {
    setIsCountdownActive(true);
    setCountdown(5);
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
          uri: "https://via.placeholder.com/400x800.png?text=Blurred+Background",
        }}
        style={styles.backgroundImage}
      >
        {/* Title */}
        <View style={[styles.header, { marginTop: height * 0.10 }]}>
        {/* Prompt Display */}
          <View style={styles.promptContainer}>
            <Text style={[styles.promptLabel, { fontSize: width * 0.06 }]}>
              prompt of the day:
            </Text>
            <Text style={[styles.promptText, { fontSize: width * 0.05 }]}>
              {prompt}
            </Text>
          </View>
        </View>

        {/* Camera Rectangle */}
        <View style={[styles.cameraContainer, { width: width * 0.9, height: height * 0.55 }]}>
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={(ref) => { if (ref !== null && ref !== undefined) setCam(ref); }}
            mode="video"
          >
            <View style={styles.overlay}>
              <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                <Text style={styles.flipButtonText}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>

        {/* Countdown Badge */}
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Pressable onPress={() => router.push('/videoFeatures/youdidit')}>
              <Text style={[styles.badgeText, { fontSize: width * 0.06 }]}>
                {countdown > 0 ? countdown : "Done"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={handleStart} disabled={isCountdownActive && countdown > 0}>
          <Text style={[styles.startButtonText, { fontSize: width * 0.06 }]}>
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
    paddingHorizontal: "5%",
    alignItems: "center",
  },
  title: {
    fontFamily: "Hind_700Bold",
    color: "white",
    textAlign: "center",
    lineHeight: 45,
  },
  promptContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  promptLabel: {
    fontFamily: "Gluten_700Bold",
    color: "white",
    textAlign: "center",
    marginTop: "6%",
  },
  promptText: {
    fontFamily: "Hind_700Bold",
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  cameraContainer: {
    borderRadius: 40,
    overflow: "hidden",
    marginTop: "3%",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "5%",
  },
  flipButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: "2%",
    paddingHorizontal: "5%",
  },
  flipButtonText: {
    fontSize: 16,
    fontFamily: "Hind_700Bold",
    color: "black",
  },
  badgeContainer: {
    position: "absolute",
    top: "5%",
    right: "3%",
    alignItems: "flex-end",
  },
  badge: {
    backgroundColor: "rgba(255, 0, 0, 0.85)",
    borderRadius: 15,
    paddingVertical: "1.5%",
    paddingHorizontal: "4%",
    minWidth: "40%",
    alignItems: "center",
    marginTop: "10%",
  },
  badgeText: {
    fontFamily: "Hind_700Bold",
    color: "white",
    textAlign: "right",
  },
  startButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: "4%",
    paddingHorizontal: "15%",
    marginBottom: "5%",
  },
  startButtonText: {
    fontFamily: "Gluten_700Bold",
    color: "black",
  },
  permissionText: {
    fontSize: 16,
    fontFamily: "Hind_700",
    color: "white",
    textAlign: "center",
    marginBottom: "5%",
  },
  permissionButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: "3%",
    paddingHorizontal: "6%",
  },
  permissionButtonText: {
    fontSize: 16,
    fontFamily: "Hind_700Bold",
    color: "black",
  },
});

export default Record;
