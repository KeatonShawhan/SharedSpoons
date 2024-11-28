// app/pages/makePost/makepost.tsx

import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Animated,
  Keyboard,
  EmitterSubscription,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ImagePickerBox } from '@/components/makePost/ImagePickerBox';
import { DishNameBox } from '@/components/makePost/DishNameBox';
import { MakePostScreenStackParamList } from '@/app/(tabs)/makePostMain';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

const HEADER_HEIGHT = 60; // Adjust if needed

type MakePostNavigationProp = NativeStackNavigationProp<MakePostScreenStackParamList, 'Main'>;

export default function MakePost() {
  const route = useRoute<RouteProp<MakePostScreenStackParamList, 'Main'>>();
  const { repostDish, repostRestaurant, repostId } = route.params;
  const colorScheme = useColorScheme();
  const navigation = useNavigation<MakePostNavigationProp>();
  let repost = false

  if (repostDish != '' || repostRestaurant != '' || repostId != '') {
    repost = true
  } else {
    repost = false
  }

  const [dishName, setDishName] = useState(repostDish ? repostDish : '');
  const [restaurant, setRestaurant] = useState(repostRestaurant ? repostRestaurant : '');
  const [id, setId] = useState(repostId ? repostId : '');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isFormComplete = selectedImage && dishName.trim().length > 0;

  const [isDishNameFocused, setIsDishNameFocused] = useState(false);

  // Animations
  const dishNamePosition = useRef(new Animated.Value(0)).current; 
  const contentOpacity = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (!isFormComplete) {
      Alert.alert('Incomplete Information', 'Please select an image and the dish name.');
      return;
    }

    // Navigate to 'Details' screen, passing selectedImage and caption
    navigation.navigate('Details', {
      selectedImage,
      dishname: dishName.trim(),
      restaurant: restaurant,
      id: id,
      isRepost: repost
    });
  };

  const handleCancel = () => {
    // Show confirmation alert before clearing the form
    Alert.alert(
      'Discard Post?',
      'Are you sure you want to discard this post? Your current selections will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => {
            Keyboard.dismiss();

            setSelectedImage(null);
            setDishName('');
            setRestaurant('');
            setId('');
            navigation.goBack();
          },
        },
      ]
    );
  };

  // Keyboard event listeners
  useEffect(() => {

    const keyboardWillShowSub: EmitterSubscription = Keyboard.addListener('keyboardWillShow', () => {
      animateDishName(true);
    });
  
    const keyboardWillHideSub: EmitterSubscription = Keyboard.addListener('keyboardWillHide', () => {
      animateDishName(false);
    });
  

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);

  const animateDishName = (focus: boolean) => {
    setIsDishNameFocused(focus);

    Animated.parallel([
      Animated.timing(dishNamePosition, {
        toValue: focus ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: focus ? 0.3 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const translateY = dishNamePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200], 
  });

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.headerButtonLeft}>
          <Text style={[styles.cancelButtonText, { color: Colors[colorScheme].text }]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme].text }]}>
          New Post
        </Text>
        <TouchableOpacity onPress={handleNext} style={styles.headerButtonRight}>
          <Text style={[styles.nextButtonText, !isFormComplete && styles.nextButtonDisabled]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
          <ImagePickerBox
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isDisabled={isDishNameFocused} 
          />
        </Animated.View>

        {isDishNameFocused && (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}

        {/* DishName Input */}
        <Animated.View
          style={[
            styles.dishNameContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <DishNameBox
            dishName={dishName}
            setDishName={setDishName}
            onFocus={() => animateDishName(true)}
            onBlur={() => animateDishName(false)}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginTop: 40,
    borderBottomColor: '#ccc',
  },
  headerButtonLeft: {
    position: 'absolute',
    left: 16,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
  },
  headerButtonRight: {
    position: 'absolute',
    right: 16,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonText: {
    fontSize: 16,
    color: Colors.light.primaryColor,
  },
  nextButtonDisabled: {
    color: Colors.light.icon, 
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  dishNameContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
