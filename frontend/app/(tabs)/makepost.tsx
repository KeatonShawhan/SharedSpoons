import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Button, Alert } from 'react-native';
import { Header } from '@/components/home/Header';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ImagePickerBox } from '@/components/makePost/ImagePickerBox';
import { CaptionInputBox } from '@/components/makePost/CaptionInputBox';
import { StarRating } from '@/components/makePost/StarRating';
import { useNavigation } from '@react-navigation/native';

const HEADER_HEIGHT = 80; // Match this to your Header component's actual height

export default function MakePost() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    if (!selectedImage || !caption.trim() || rating === 0) {
      Alert.alert('Incomplete Information', 'Please select an image, enter a caption, and provide a rating.');
      return;
    }

    const formData = new FormData();

    // Append image
    formData.append('image', {
      uri: selectedImage,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any); // Add 'as any' to fix TypeScript type issue

    // Append other fields
    formData.append('caption', caption.trim());
    formData.append('rating', rating.toString());

    try {
      const response = await fetch('https://your-backend-api.com/posts', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data', // Let fetch set this automatically
          // Include authentication headers if necessary
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Post submitted successfully');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        console.error('Error submitting post:', errorData);
        Alert.alert('Submission Failed', 'Failed to submit post. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      Alert.alert('An Error Occurred', 'Please try again.');
    }
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
        <StarRating rating={rating} setRating={setRating} />
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  firstComponent: {
    marginTop: 16,
  },
});
