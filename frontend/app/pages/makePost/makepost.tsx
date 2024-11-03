// app/pages/makePost/makepost.tsx
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { Header } from '@/components/home/Header';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ImagePickerBox } from '@/components/makePost/ImagePickerBox';
import { CaptionInputBox } from '@/components/makePost/CaptionInputBox';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MakePostScreenStackParamList } from '@/app/(tabs)/makePostMain';

const HEADER_HEIGHT = 80; // Match this to your Header component's actual height

type MakePostNavigationProp = NativeStackNavigationProp<MakePostScreenStackParamList, 'Main'>;

export default function MakePost() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<MakePostNavigationProp>();
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedImage || !caption.trim()) {
      Alert.alert('Incomplete Information', 'Please select an image and enter a caption.');
      return;
    }

    // Navigate to 'Details' screen, passing selectedImage and caption
    navigation.navigate('Details', {
      selectedImage,
      caption: caption.trim(),
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.headerContainer}>
        <Header colorScheme={colorScheme} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImagePickerBox
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <CaptionInputBox caption={caption} setCaption={setCaption} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT + 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  buttonContainer: {
    marginTop: 24,
    alignSelf: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: Colors.light.secondaryColor, // Button background color
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.light.primaryColor, // Text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});
