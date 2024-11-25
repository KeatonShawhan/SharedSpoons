import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text, StyleProp, ViewStyle, useColorScheme } from 'react-native';
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

export function ImagePickerBox({ selectedImage, setSelectedImage, style, isDisabled }: ImagePickerBoxProps) {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme || 'light'];

  const resizeImage = async (uri: string) => {
    try {
      const manipResult = await manipulateAsync(
        uri,
        [{ resize: { width: 1920, height: 1080 } }],
        { compress: 0.7, format: SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error("Failed to resize image:", error);
      alert('Failed to process image.');
      return null;
    }
  };

  const openImagePicker = async () => {
    if (isDisabled) return; // Prevent interaction if disabled

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, // High quality to ensure good input for resizing
    });

    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
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
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={[styles.placeholderText, { color: themeColors.icon }]}>Tap to select an image</Text>
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
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
