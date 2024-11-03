// app/pages/makePost/makepostDetails.tsx
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { Header } from '@/components/home/Header';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { StarRating } from '@/components/makePost/StarRating';
import { RestaurantInputBox } from '@/components/makePost/RestaurantInputBox';
import { DishNameInputBox } from '@/components/makePost/DishNameInputBox';
import { CategoryInputBox } from '@/components/makePost/CategoryInputBox';
import { NotesInputBox } from '@/components/makePost/NotesInputBox';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MakePostScreenStackParamList } from '@/app/(tabs)/makePostMain';

const HEADER_HEIGHT = 80; // Match this to your Header component's actual height

type MakePostDetailsRouteProp = RouteProp<MakePostScreenStackParamList, 'Details'>;
type MakePostDetailsNavigationProp = NativeStackNavigationProp<MakePostScreenStackParamList, 'Details'>;

type Props = {
  route: MakePostDetailsRouteProp;
  navigation: MakePostDetailsNavigationProp;
};

export default function MakePostDetails({ route, navigation }: Props) {
  const colorScheme = useColorScheme();
  const { selectedImage, caption } = route.params;
  const [rating, setRating] = useState(0);
  const [restaurant, setRestaurant] = useState('');
  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    if (!rating || !restaurant.trim() || !dishName.trim() || !category.trim()) {
      Alert.alert('Incomplete Information', 'Please provide all required information.');
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
    formData.append('caption', caption);
    formData.append('rating', rating.toString());
    formData.append('restaurant', restaurant.trim());
    formData.append('dishName', dishName.trim());
    formData.append('category', category.trim());
    formData.append('notes', notes.trim());

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
        Alert.alert('Success', 'Your post has been submitted successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Main') },
        ]);
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
        <StarRating rating={rating} setRating={setRating} />
        <RestaurantInputBox restaurant={restaurant} setRestaurant={setRestaurant} />
        <DishNameInputBox dishName={dishName} setDishName={setDishName} />
        <CategoryInputBox category={category} setCategory={setCategory} />
        <NotesInputBox notes={notes} setNotes={setNotes} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Post</Text>
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
    paddingTop: HEADER_HEIGHT + 20, // Adjusted padding to prevent overlapping
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  buttonContainer: {
    marginTop: 24,
    alignSelf: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#32CD32', // Button background color (example: LimeGreen)
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Text color set to white
    fontSize: 18,
    fontWeight: 'bold',
  },
});
