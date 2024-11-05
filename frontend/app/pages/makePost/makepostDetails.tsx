// app/pages/makePost/makepostDetails.tsx

import React, { useState, useRef, useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
// Remove BlurView import if not using it
import { BlurView } from 'expo-blur';
import { Header } from '@/components/home/Header';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StarRating } from '@/components/makePost/StarRating';
import { RestaurantInputBox } from '@/components/makePost/RestaurantInputBox';
import { DishNameInputBox } from '@/components/makePost/DishNameInputBox';
// Import LoginContext
import LoginContext from '@/contexts/loginContext';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MakePostScreenStackParamList } from '@/app/(tabs)/makePostMain';
import MakePostHeader from '@/components/makePost/MakePostHeader';
import API_URL from '@/config';

const HEADER_HEIGHT = 80;

type MakePostDetailsRouteProp = RouteProp<MakePostScreenStackParamList, 'Details'>;
type MakePostDetailsNavigationProp = NativeStackNavigationProp<MakePostScreenStackParamList, 'Details'>;

type Props = {
  route: MakePostDetailsRouteProp;
  navigation: MakePostDetailsNavigationProp;
};

export default function MakePostDetails({ route, navigation }: Props) {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme || 'light'];
  const { selectedImage, caption } = route.params; // Destructure caption from route.params
  const [rating, setRating] = useState(0);
  const [restaurant, setRestaurant] = useState('');
  const [dishName, setDishName] = useState('');

  // Import accessToken and userId from LoginContext
  const { accessToken, userId } = useContext(LoginContext);
  console.log(userId);
  console.log(accessToken);
  // For the caption box animation (if needed)
  const [showCaptionBox, setShowCaptionBox] = useState(false);
  const captionAnim = useRef(new Animated.Value(0)).current;

  const handlePlusPress = () => {
    setShowCaptionBox(true);
    Animated.timing(captionAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleOutsideClick = () => {
    Animated.timing(captionAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowCaptionBox(false);
    });
  };

  const handleSubmit = async () => {
    if (!rating || !restaurant.trim() || !dishName.trim()) {
      Alert.alert('Incomplete Information', 'Please provide all required information.');
      return;
    }

    const postData = {
      rating: rating,
      restaurant: restaurant.trim(),
      dish: dishName.trim(),
      caption: caption,
    };

    const formData = new FormData();
    formData.append('post', JSON.stringify(postData));
    formData.append('file', {
      uri: selectedImage,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await fetch(`${API_URL}post/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          // Do not set 'Content-Type' when sending FormData
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Your post has been submitted successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Main') },
        ]);
        console.log(response);
      } else {
        const errorData = await response.json();
        Alert.alert('Submission Failed', errorData.message || 'Failed to submit post. Please try again.');
      }
    } catch (error) {
      Alert.alert('An Error Occurred', 'Please try again.');
      console.error('Submission error:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.headerContainer, { zIndex: showCaptionBox ? 0 : 1 }]}>
        <MakePostHeader />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Image with Plus Button */}
        <View style={styles.imageAndRatingContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <TouchableOpacity style={styles.plusButton} onPress={handlePlusPress}>
              <Ionicons name="add-circle" size={32} color={themeColors.tint} />
            </TouchableOpacity>
          </View>

          {/* Rating Section to the right of the image */}
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText, { color: themeColors.text }]}>Enter a Rating:</Text>
            <StarRating rating={rating} setRating={setRating} />
          </View>
        </View>

        {/* Form Fields */}
        <RestaurantInputBox restaurant={restaurant} setRestaurant={setRestaurant} />
        <DishNameInputBox dishName={dishName} setDishName={setDishName} />
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Caption Box (if you're still using it) */}
      {showCaptionBox && (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={StyleSheet.absoluteFill}>
            {/* Replace BlurView with a simple View if not using expo-blur */}
            {<BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} /> }
            <Animated.View
              style={[
                styles.captionInputContainer,
                {
                  opacity: captionAnim,
                  transform: [{ scale: captionAnim }],
                  backgroundColor: themeColors.background,
                },
              ]}
            >
              <Text
                style={[styles.captionText, { color: themeColors.text }]}
                numberOfLines={4} // Adjust as needed
              >
                {caption}
              </Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // ... existing styles ...
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  imageAndRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 70,
  },
  imageContainer: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  plusButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  ratingContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  captionInputContainer: {
    position: 'absolute',
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
    maxWidth: '80%',
    top: '19%',
    left: '25%',
  },
  captionText: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    borderRadius: 30,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 24,
    alignSelf: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: Colors.light.primaryColor,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
