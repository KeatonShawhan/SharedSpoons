import React, { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { postCard } from '@/components/postCard/postCard';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/home/Header';
import { Colors } from '@/constants/Colors';
import type { HomeScreenNavigationProp } from '@/app/(tabs)';

const HEADER_HEIGHT = 80; 
const SCROLL_THRESHOLD = 50; 

const DUMMY_POSTS = [
  {
    id: "83c689b1-b7a7-4100-8b2d-309908b444f5",
    username: "Zoe Feller",
    caption: "yum!",
    dish: "pepperoni pizza",
    rating: 4.5,
    place: "Pizza Hut",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU",
    categories: ["Pizza", "Italian"],
    notes: "i thought it was really good, maybe a little greasy "
  },
  {
    id: "81c689b1-b7a7-4100-8b2d-309908b444f5",
    username: "Keaton Shawhan",
    caption: "had e coli :/",
    dish: "big mac",
    rating: 1,
    place: "McDonalds",
    image: "https://i2-prod.walesonline.co.uk/incoming/article22961099.ece/ALTERNATES/s615b/0_EGR_020222_ChickenBigMac_05.jpg",
    categories: ["Fast Food", "American"],
    notes: "terrible awful disgusting. dont eat here. my burger looked nasty."
  },
  {
    id: "83c689b1-b7a7-4100-8b2d-309908b444f5",
    username: "Luca Schram",
    caption: ":p",
    dish: "Italian Sandwich #13 with no ham add roast beef",
    rating: 4,
    place: "Jersey Mikes",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvmjamuCycuEPL9U1rse906oY1Ga-8uv0vw&s",
    categories: ["Lunch", "Deli", "Fast Food"],
    notes: "I love the rosemary parm bread its my favorite. I usually get it mikes waay with no tomatoes and honey mustard on the side"
  }
];

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const colorScheme = useColorScheme();
  
    // Use a ref to track the scroll position
    const scrollYRef = useRef(new Animated.Value(0)).current;
  
    // Set up header animations based on scrollY
    const headerTranslateY = scrollYRef.interpolate({
      inputRange: [0, SCROLL_THRESHOLD],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'
    });
  
    const headerOpacity = scrollYRef.interpolate({
      inputRange: [0, SCROLL_THRESHOLD],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
  
    return (
      <SafeAreaView 
        edges={['top']}
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].background }
        ]}
      >
        <Animated.View 
          style={[
            styles.headerContainer,
            { 
              transform: [{ translateY: headerTranslateY }],
              opacity: headerOpacity,
            }
          ]}
        >
          <Header colorScheme={colorScheme} />
        </Animated.View>
  
        <Animated.ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYRef } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {DUMMY_POSTS.map(post => postCard(post))}
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 0,
    },
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    scrollContent: {
      paddingTop: HEADER_HEIGHT,
      paddingHorizontal: 16,
    },
  });