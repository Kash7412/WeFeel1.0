import React, {FC} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import { useRouter } from "expo-router";


const screenWidth = Dimensions.get('window').width; // Get the screen width

const cardMargin = 5; // Margin for each card
const cardPadding = 5; // Padding inside each card
const gridPadding = 5; // Padding for the grid
const gridBorderRadius = 20; // Increased border radius for noticeable rounded corners

// Calculate the width for each card dynamically
const cardWidth = (screenWidth - (cardMargin + cardPadding) * 6 - gridPadding * 2) / 3;


const Home: FC = () => {
    const router = useRouter();
  
    const handleNavigation = (path: string) => {
      router.push(path);
    };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => handleNavigation('/admin/settings')}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Image 
            source={require("../../assets/profile.png")} // Ensure the correct path
            style={styles.profileImage}
          />
          <Text style={styles.title}>WeFeel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleNavigation('/admin/settings')}
          style={styles.settingsButton}
        >
          <Image 
            source={require("../../assets/settings-25-128.png")} // Ensure the correct path to your settings icon image
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>mine</Text>
      <View style={styles.grid}>
      <View style={[styles.card, { width: cardWidth }]}>
          {/* Adjust Image component here */}
          <TouchableOpacity 
            onPress={() => handleNavigation('/videoFeatures/share')} // Adjust the path according to your router settings
            style={{ alignItems: 'center', width: '100%', height: '100%' }}
          >
          <Image 
            style={[styles.image, {
              marginTop: 15,
              width: '45%', 
              height: undefined, 
              aspectRatio: 1,
              marginBottom: 0 // Remove extra space below the image
            }]} 
            source={require("../../assets/shareicon.png")}
            resizeMode="contain"
          />
          <Text style={[styles.cardText, {
            marginTop: 12, // Adjust space between icon and text
            fontSize: 21 // Optional: adjust text size if needed
          }]}>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.card, { width: cardWidth, padding: 0 }]}>
          {/* Adjust Image component here */}
          <TouchableOpacity 
            onPress={() => handleNavigation('/videoFeatures/record')} // Adjust the path according to your router settings
            style={{ alignItems: 'center', width: '100%', height: '100%' }}
          >
            <Image 
                style={[styles.image, {
                marginTop: 0,
                width: '100%', 
                height: '120%', 
                aspectRatio: 1,
                resizeMode: 'cover',
                marginBottom: 0 // Remove extra space below the image
                }]} 
                source={require("../../assets/WeFeelHike.png")}
                resizeMode="contain"
            />
            <View style={[styles.fullOverlay, { height: 150 }]}>
            <Text style={[styles.cardText, {
                fontSize: 16, // Optional: adjust text size if needed
                textAlign: 'center',
                color: 'white',
                marginTop: 0
            }]}>Your</Text>
            <Text style={[styles.cardText, {
                fontSize: 16, // Optional: adjust text size if needed
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Gluten_700Bold',
                marginTop: 0
            }]}>WeFeel</Text>
            </View>
        </TouchableOpacity>
        </View>
        <View style={[styles.card, { width: cardWidth }]}>
          {/* Adjust Image component here */}
          <Image 
            style={[styles.image, {
              marginTop: 15,
              width: '45%', 
              height: undefined, 
              aspectRatio: 1,
              marginBottom: 0 // Remove extra space below the image
            }]} 
            source={require("../../assets/vidcam.png")}
            resizeMode="contain"
          />
          
          <Text style={[styles.cardText, {
            marginTop: 12, // Adjust space between icon and text
            fontSize: 16, // Optional: adjust text size if needed
            textAlign: 'center'
          }]}>next prompt: tomorrow</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, {marginTop: 10}]}>the world</Text>
      <View style={[styles.card, { width: (screenWidth * .85), height: 450, backgroundColor: "grey" }]}>
      <Image 
            style={[styles.image, {
              marginTop: -30,
              width: '120%', 
              height: '120%', 
              aspectRatio: 1,
              resizeMode: 'cover',
              marginBottom: 0 // Remove extra space below the image
            }]} 
            source={require("../../assets/exampWeFeel.png")}
            resizeMode="contain"
          />
        <View style={[styles.fullOverlay, { height: 450, width: '110%' }]}>
        <TouchableOpacity 
            style={styles.playButton}
            onPress={() => handleNavigation("/videoFeatures/Feed")} // Replace 'FeedPage' with the actual route name
          >
            <Image 
              source={require("../../assets/playicon.png")} // Make sure the path is correct
              style={{ width: 100, height: 100 }} // Adjust size as needed
            />
          </TouchableOpacity>

        <TouchableOpacity style={styles.button} accessible accessibilityLabel="Start collecting">
          <Text style={[styles.cardText, {marginTop: 200, fontSize: 48}]}>Share a video of something that made you smile! </Text>
        </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black"
  },
  header: {
    flexDirection: 'row',  // Ensures items are in a row
    justifyContent: 'center',  // Centers the items horizontally
    alignItems: 'center',  // Aligns items vertically
    marginTop: 50,
    marginBottom: 10
  },
  title: {
    fontFamily: 'Gluten_700Bold',
    fontSize: 64,
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center'
  },
  sectionTitle: {
    fontFamily: 'RedHatDisplay_400Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'left'
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap', // Ensure cards stay on one line
    backgroundColor: '#eee',
    height: 150,
    padding: gridPadding,
    borderRadius: gridBorderRadius, // Rounded edges
  },
  card: {
    backgroundColor: "black",
    alignItems: 'center',
    padding: cardPadding,
    borderRadius: 40, // Rounded card corners
    width: cardWidth,
    overflow: 'hidden',
    margin: cardMargin,
  },
  image: {
    width: '100%', // Image fills the card width
    height: '60%', // Image height relative to the card
    marginBottom: 10
  },
  cardText: {
    fontFamily: 'RedHatDisplay_400Regular',
    marginTop: (cardWidth/2),
    fontSize: 16,
    color: "white"
  },
  button: {
    padding: 10,
    marginBottom: 10
  },
  fullOverlay: {
    position: 'absolute',
    width: '100%', // Cover the full width of the card
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Semi-transparent black background
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    padding: 10 // Padding for the text inside the overlay
  },
  playButton: {
    position: 'absolute',
    top: '50%', // Center vertically in the overlay
    left: '50%', // Center horizontally in the overlay
    transform: [{ translateX: -40 }, { translateY: -75 }], // Adjust based on the size of the icon
    zIndex: 10, // Ensure it's clickable
  },
  profileImage: {
    width: 50, // Set the width of the image
    height: 50, // Set the height of the image
    borderRadius: 25, // Half of width and height to make it circle
    marginRight: 30, // Add some spacing between the image and the title
  },
  settingsButton: {
    marginLeft: 35,
    marginRight: 20  // Space from the right edge of the screen
  },
  settingsIcon: {
    marginLeft: 0,
    width: 40, // Adjust according to your preference
    height: 40, // Adjust according to your preference
  },
});

export default Home;
