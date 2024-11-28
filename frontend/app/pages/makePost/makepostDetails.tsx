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
} from 'react-native';
// Remove BlurView import if not using it
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StarRating } from '@/components/makePost/StarRating';
import { RestaurantInputBox } from '@/components/makePost/RestaurantInputBox';
import { CaptionBox } from '@/components/makePost/CaptionBox';
// Import LoginContext
import { StackNavigationProp } from '@react-navigation/stack';
import LoginContext from '@/contexts/loginContext';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MakePostScreenStackParamList } from '@/app/(tabs)/makePostMain';
import MakePostHeader from '@/components/makePost/MakePostHeader';
import API_URL from '@/config';
import { RootTabParamList } from '@/app/(tabs)/_layout';
import { useNavigation } from 'expo-router';
import { CommonActions } from '@react-navigation/native';
import { addRepost } from './repostHelpers';
const HEADER_HEIGHT = 80;

type MakePostDetailsRouteProp = RouteProp<MakePostScreenStackParamList, 'Details'>;
type MakePostDetailsNavigationProp = NativeStackNavigationProp<MakePostScreenStackParamList, 'Details'>;

type Props = {
  route: MakePostDetailsRouteProp;
  navigation: MakePostDetailsNavigationProp;
};

export default function MakePostDetails({route, navigation}: Props) {
  const rootnav = useNavigation<StackNavigationProp<RootTabParamList>>(); // Use the correct type here

  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme || 'light'];
  const { selectedImage, dishname, restaurant, isRepost, id } = route.params;

  const [rating, setRating] = useState(0);
  const [restaurantInit, setRestaurant] = useState(restaurant);
  const [captionNew, setCaptionNew] = useState('');
  // Import accessToken and userId from LoginContext
  const { accessToken } = useContext(LoginContext);

  const [showDishNameBox, setShowDishNameBox] = useState(false);
  const dishNameAnim = useRef(new Animated.Value(0)).current;
  const loginContext = useContext(LoginContext)
  const handlePlusPress = () => {
    setShowDishNameBox(true);
    Animated.timing(dishNameAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleOutsideClick = () => {
    Animated.timing(dishNameAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowDishNameBox(false);
    });
  };

  const handleSubmit = async () => {
    let post_id = ''
    if (!rating || !restaurantInit.trim() || !captionNew.trim()) {
      Alert.alert('Incomplete Information', 'Please provide all required information.');
      return;
    }

    const postData = {
      rating: rating,
      restaurant: restaurantInit.trim(),
      caption: captionNew.trim(),
      dish: dishname,
    };

    const formData = new FormData();
    formData.append('post', JSON.stringify(postData));

    /* eslint-disable */
    formData.append('file', {
      uri: selectedImage,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);
    /* eslint-enable */

    try {
      const response = await fetch(`${API_URL}post/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        post_id = await response.json()
        Alert.alert('Success', 'Your post has been submitted successfully.', [
          
          { text: 'OK', onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              })
            );
            loginContext.setMadePost(!loginContext.madePost)
            rootnav.navigate('index') 
          }},
        ]);

      } else {
        const errorData = await response.json();
        Alert.alert('Submission Failed', errorData.message || 'Failed to submit post. Please try again.');
      }
    } catch (error) {
      if (error.message.includes("401")) {
        loginContext.handleLogout();
        return;
      }
      Alert.alert('An Error Occurred', 'Please try again.');
      console.error('Submission error:', error);
    }

    if (isRepost) {
      addRepost(id, post_id, accessToken)
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.headerContainer, { zIndex: showDishNameBox ? 0 : 1 }]}>
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
        <RestaurantInputBox restaurant={restaurantInit} setRestaurant={setRestaurant} />
        <CaptionBox caption={captionNew} setCaption={setCaptionNew} />
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Caption Box (if you're still using it) */}
      {showDishNameBox && (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={StyleSheet.absoluteFill}>
            {/* Replace BlurView with a simple View if not using expo-blur */}
            {<BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} /> }
            <Animated.View
              style={[
                styles.dishNameInputContainer,
                {
                  opacity: dishNameAnim,
                  transform: [{ scale: dishNameAnim }],
                  backgroundColor: themeColors.background,
                },
              ]}
            >
              <Text
                style={[styles.dishNameText, { color: themeColors.text }]}
                numberOfLines={4} // Adjust as needed
              >
                {dishname}
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
  dishNameInputContainer: {
    position: 'absolute',
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
    maxWidth: '80%',
    top: '19%',
    left: '25%',
  },
  dishNameText: {
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
