import React, { FC } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from "expo-router";

const Home: FC = () => {
    const router = useRouter();
    const { width: screenWidth, height: screenHeight } = useWindowDimensions(); // Dynamically get screen width & height

    const cardMargin = screenWidth * 0.01; // ✅ Reduced margin
    const cardPadding = screenWidth * 0.015; // ✅ Reduced padding
    const gridPadding = screenWidth * 0.015;
    const gridBorderRadius = screenWidth * 0.04;

    // ✅ Increased card width by reducing spacing
    const cardWidth = (screenWidth - (cardMargin * 4) - (gridPadding * 2)) / 3.2; 

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => handleNavigation('/admin/settings')}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Image 
                        source={require("../../assets/profile.png")}
                        style={[styles.profileImage, { width: screenWidth * 0.15, height: screenWidth * 0.15 }]} 
                    />
                    <Text style={[styles.title, { fontSize: screenWidth * 0.13 }]}>WeFeel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => handleNavigation('/admin/settings')}
                    style={styles.settingsButton}
                >
                    <Image 
                        source={require("../../assets/settings-25-128.png")}
                        style={[styles.settingsIcon, { width: screenWidth * 0.12, height: screenWidth * 0.12 }]} 
                    />
                </TouchableOpacity>
            </View>

            {/* Section Title */}
            <Text style={[styles.sectionTitle, { fontSize: screenWidth * 0.06 }]}>mine</Text>

            {/* Grid Section */}
            <View style={[styles.grid, { padding: gridPadding, borderRadius: gridBorderRadius }]}>
                <View style={[styles.card, { width: cardWidth, padding: cardPadding }]}>
                    <TouchableOpacity 
                        onPress={() => handleNavigation('/videoFeatures/share')}
                        style={{ alignItems: 'center', width: '100%', height: '100%' }}
                    >
                        <Image 
                            style={[styles.image, { width: '50%', aspectRatio: 1 }]}
                            source={require("../../assets/shareicon.png")}
                            resizeMode="contain"
                        />
                        <Text style={[styles.cardText, { fontSize: screenWidth * 0.05 }]}>Share</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.card, { width: cardWidth }]}>
                    <TouchableOpacity 
                        onPress={() => handleNavigation('/videoFeatures/record')}
                        style={{ alignItems: 'center', width: '100%', height: '100%' }}
                    > 
                        <Image 
                            style={[styles.image, { width: '100%', height: '100%', aspectRatio: 1 }]}
                            source={require("../../assets/WeFeelHike.png")}
                            resizeMode="cover"
                        />
                        <View style={[styles.fullOverlay, { height: screenHeight * 0.2 }]}>
                            <Text style={[styles.cardText, { fontSize: screenWidth * 0.04, color: 'white' }]}>Your</Text>
                            <Text style={[styles.cardText, { fontSize: screenWidth * 0.05, fontFamily: 'Gluten_700Bold', color: 'white' }]}>WeFeel</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.card, { width: cardWidth }]}>
                    <Image 
                        style={[styles.image, { width: '50%', aspectRatio: 1 }]}
                        source={require("../../assets/vidcam.png")}
                        resizeMode="contain"
                    />
                    <Text style={[styles.cardText, { fontSize: screenWidth * 0.04, textAlign: 'center' }]}>
                        next prompt: tomorrow
                    </Text>
                </View>
            </View>

            {/* The World Section */}
            <Text style={[styles.sectionTitle, { fontSize: screenWidth * 0.06, marginTop: screenHeight * 0.02 }]}>the world</Text>
            <View style={[styles.card, { width: screenWidth * 0.92, height: screenHeight * 0.6, backgroundColor: "grey" }]}>
                <Image 
                    style={[styles.image, { width: '100%', height: '100%', aspectRatio: 1 }]}
                    source={require("../../assets/exampWeFeel.png")}
                    resizeMode="cover"
                />
                <View style={[styles.fullOverlay, { height: screenHeight * 0.6 }]}>
                    <TouchableOpacity 
                        style={styles.playButton}
                        onPress={() => handleNavigation("/videoFeatures/Feed")}
                    >
                        <Image 
                            source={require("../../assets/playicon.png")}
                            style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={[styles.cardText, { fontSize: screenWidth * 0.07 }]}>
                            Share a video of something that made you smile!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '3%', // ✅ Reduced left & right margins
        backgroundColor: "black"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', // ✅ Improved alignment
        alignItems: 'center',
        marginTop: '15%',
        marginBottom: '2%'
    },
    title: {
        fontFamily: 'Gluten_700Bold',
        color: '#ffffff',
    },
    sectionTitle: {
        fontFamily: 'RedHatDisplay_400Regular',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between', // ✅ Evenly distributed cards
        flexWrap: 'nowrap',
        backgroundColor: '#eee',
        height: '18%'
    },
    card: {
        backgroundColor: "black",
        alignItems: 'center',
        borderRadius: 40,
        overflow: 'hidden',
        margin: '.3%' // ✅ Reduced margins
    },
    image: {
        width: '100%',
        height: '60%',
    },
    cardText: {
        fontFamily: 'RedHatDisplay_400Regular',
        color: "white"
    },
    button: {
        padding: 10,
        marginBottom: 10
    },
    fullOverlay: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -40 }, { translateY: -40 }],
        zIndex: 10
    },
    profileImage: {
        borderRadius: 50,
        marginRight: '3%'
    },
    settingsButton: {
        marginRight: '3%',
    },
    settingsIcon: {
        marginLeft: 0,
    }
});

export default Home;
