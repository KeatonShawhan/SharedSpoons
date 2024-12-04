// app/components/makePost/ImagePickerBox.tsx
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Colors } from '@/constants/Colors';

const ORANGE_COLOR = '#FF9F45';

type ImagePickerBoxProps = {
  selectedImage: string | null;
  setSelectedImage: (uri: string) => void;
  style?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
};

export function ImagePickerBox({
  selectedImage,
  setSelectedImage,
  style,
  isDisabled,
}: ImagePickerBoxProps) {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme || 'light'];

  /**
   * Resizes and centers the image to fit within a 1920x1920 square.
   * @param uri The URI of the image to resize and crop.
   * @returns The URI of the processed image or null if processing fails.
   */
  const resizeImage = async (uri: string) => {
    try {
      // Step 1: Get original image dimensions
      const { width, height } = await new Promise<{ width: number; height: number }>(
        (resolve, reject) => {
          Image.getSize(
            uri,
            (w, h) => resolve({ width: w, height: h }),
            (error) => reject(error)
          );
        }
      );

      // Step 2: Calculate aspect ratio and resize dimensions
      const aspectRatio = width / height;
      let resizeWidth: number;
      let resizeHeight: number;

      if (aspectRatio > 1) {
        // Image is wider than tall
        resizeHeight = 1920;
        resizeWidth = Math.round(aspectRatio * 1920);
      } else {
        // Image is taller than or equal to width
        resizeWidth = 1920;
        resizeHeight = Math.round(1920 / aspectRatio);
      }

      // Step 3: Calculate crop origin to center the image
      const originX = Math.round((resizeWidth - 1920) / 2);
      const originY = Math.round((resizeHeight - 1920) / 2);

      // Step 4: Perform resize and crop
      const manipResult = await manipulateAsync(
        uri,
        [
          { resize: { width: resizeWidth, height: resizeHeight } }, // Resize while maintaining aspect ratio
          {
            crop: {
              originX: originX < 0 ? 0 : originX,
              originY: originY < 0 ? 0 : originY,
              width: 1920,
              height: 1920,
            },
          }, // Crop to center square
        ],
        { compress: 0.7, format: SaveFormat.JPEG }
      );

      return manipResult.uri;
    } catch (error) {
      console.error('Failed to resize image:', error);
      alert('Failed to process image.');
      return null;
    }
  };

  /**
   * Opens the image picker and handles image selection.
   */
  const openImagePicker = async () => {
    if (isDisabled) return; // Prevent interaction if disabled

    // Request media library permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Launch image library
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, // High quality to ensure good input for resizing
    });

    // Handle selected image
    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      const resizedUri = await resizeImage(pickerResult.assets[0].uri);
      if (resizedUri) {
        setSelectedImage(resizedUri);
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        { backgroundColor: themeColors.background },
      ]}
      onPress={openImagePicker}
      disabled={isDisabled}
    >
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage }}
          style={styles.image}
          resizeMode="cover" // Ensures the image covers the container without stretching
        />
      ) : (
        <View style={styles.placeholder}>
          <Text
            style={[
              styles.placeholderText,
              {
                color: themeColors.icon,
                fontSize: 16,
              },
            ]}
          >
            Tap to select an image
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    aspectRatio: 1, // Makes the box square
    borderColor: ORANGE_COLOR,
    borderWidth: 2,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 60,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10, // Add padding to prevent text from touching edges
  },
  placeholderText: {
    textAlign: 'center', // Center text horizontally
  },
  image: {
    width: '100%',
    height: '100%',
  },
});