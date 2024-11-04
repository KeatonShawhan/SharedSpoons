import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity, Text, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import { Header } from '@/components/home/Header';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StarRating } from '@/components/makePost/StarRating';
import { RestaurantInputBox } from '@/components/makePost/RestaurantInputBox';
import { DishNameInputBox } from '@/components/makePost/DishNameInputBox';
//removed for endpoint purposes. Leaving them in here incase we need to go back
//import { CategoryInputBox } from '@/components/makePost/CategoryInputBox';
//import { NotesInputBox } from '@/components/makePost/NotesInputBox';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MakePostScreenStackParamList } from '@/app/(tabs)/makePostMain';
import MakePostHeader from '@/components/makePost/MakePostHeader';

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
  const { selectedImage } = route.params;
  const [caption] = useState(route.params.caption);
  const [rating, setRating] = useState(0);
  const [restaurant, setRestaurant] = useState('');
  const [dishName, setDishName] = useState('');
  
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

    const formData = new FormData();
    formData.append('image', { uri: selectedImage, name: 'photo.jpg', type: 'image/jpeg' } as any);
    formData.append('caption', caption);
    formData.append('rating', rating.toString());
    formData.append('restaurant', restaurant.trim());
    formData.append('dishName', dishName.trim());

    try {
      const response = await fetch('https://your-backend-api.com/posts', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        Alert.alert('Success', 'Your post has been submitted successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Main') },
        ]);
      } else {
        const errorData = await response.json();
        Alert.alert('Submission Failed', 'Failed to submit post. Please try again.');
      }
    } catch (error) {
      Alert.alert('An Error Occurred', 'Please try again.');
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

      {/* Blur Overlay and Caption Text Only */}
      {showCaptionBox && (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={StyleSheet.absoluteFill}>
            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
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
