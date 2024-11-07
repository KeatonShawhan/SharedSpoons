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
import { CaptionInputBox } from '@/components/makePost/CaptionInputBox';
import { MakePostScreenStackParamList } from '@/app/(tabs)/makePostMain';

const HEADER_HEIGHT = 60; // Adjust if needed

type MakePostNavigationProp = NativeStackNavigationProp<MakePostScreenStackParamList, 'Main'>;

export default function MakePost() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<MakePostNavigationProp>();
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isFormComplete = selectedImage && caption.trim().length > 0;

  const [isCaptionFocused, setIsCaptionFocused] = useState(false);

  // Animations
  const captionPosition = useRef(new Animated.Value(0)).current; // 0: original position, 1: moved position
  const contentOpacity = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (!isFormComplete) {
      Alert.alert('Incomplete Information', 'Please select an image and enter a caption.');
      return;
    }

    // Navigate to 'Details' screen, passing selectedImage and caption
    navigation.navigate('Details', {
      selectedImage,
      caption: caption.trim(),
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
            // Dismiss the keyboard to ensure the caption is not focused
            Keyboard.dismiss();

            // Clear the form data and navigate back
            setSelectedImage(null);
            setCaption('');
            navigation.goBack();
          },
        },
      ]
    );
  };

  // Keyboard event listeners
  useEffect(() => {

    const keyboardWillShowSub: EmitterSubscription = Keyboard.addListener('keyboardWillShow', () => {
      animateCaption(true);
    });
  
    const keyboardWillHideSub: EmitterSubscription = Keyboard.addListener('keyboardWillHide', () => {
      animateCaption(false);
    });
  

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);

  const animateCaption = (focus: boolean) => {
    setIsCaptionFocused(focus);

    Animated.parallel([
      Animated.timing(captionPosition, {
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

  // Interpolate the caption position
  const translateY = captionPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200], // Adjust -200 to move the caption higher or lower
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
        {/* Content that gets dimmed */}
        <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
          <ImagePickerBox
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isDisabled={isCaptionFocused} // Pass isDisabled prop based on caption focus
          />
        </Animated.View>

        {/* Overlay to detect taps outside the caption box */}
        {isCaptionFocused && (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}

        {/* Caption Input */}
        <Animated.View
          style={[
            styles.captionContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <CaptionInputBox
            caption={caption}
            setCaption={setCaption}
            onFocus={() => animateCaption(true)}
            onBlur={() => animateCaption(false)}
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
  captionContainer: {
    position: 'absolute', // Position absolute to overlay on top
    bottom: 0, // Align at the bottom
    width: '100%',
    paddingHorizontal: 16,
    zIndex: 2, // Ensure the caption is above other content
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Place the overlay below the caption input
  },
});
