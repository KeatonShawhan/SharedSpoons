import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { RootTabParamList } from './_layout';
import { StackNavigationProp } from "@react-navigation/stack";
import { ImagePickerBox } from '@/components/makePost/ImagePickerBox'; // Adjust the import path as necessary

export default function Welcome() {

  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>();

  const [bioText, setBioText] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const [dishes, setDishes] = useState<string[]>([]);
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [dishInputText, setDishInputText] = useState('');

  const handleContinue = () => {
    // Ensure at least one dish is added before continuing
    if (dishes.length === 0) {
      alert('Please add at least one dish you like.');
      return;
    }
    // Handle saving bio, profile picture, and dishes here if needed
    navigation.navigate('login');
  };

  const handleAddDish = () => {
    if (dishInputText.trim() === '') {
      // If input is empty, hide the input field
      setIsAddingDish(false);
      setDishInputText('');
      return;
    }
    if (dishes.length >= 10) {
      alert('You can only add up to 10 dishes.');
      setIsAddingDish(false);
      setDishInputText('');
      return;
    }
    setDishes([...dishes, dishInputText.trim()]);
    setDishInputText('');
    setIsAddingDish(false);
  };

  const handleRemoveDish = (index: number) => {
    const newDishes = [...dishes];
    newDishes.splice(index, 1);
    setDishes(newDishes);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.contentContainer}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <FontAwesome
              name="cutlery"
              size={60}
              color="#FF9900"
              style={styles.logo}
            />
            <Text style={styles.appName}>Welcome to{'\n'}Shared Spoons</Text>
          </View>
          
          {/* Bio and Profile Picture Section */}
          <View style={styles.bioAndPfpContainer}>
            {/* Bio Section */}
            <View style={styles.bioContainer}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={styles.bioInput}
                placeholder="Enter your bio"
                value={bioText}
                onChangeText={setBioText}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Profile Picture Section */}
            <View style={styles.pfpContainer}>
              <Text style={styles.label}>Profile Picture</Text>
              <ImagePickerBox
                selectedImage={profilePicture}
                setSelectedImage={setProfilePicture}
                isDisabled={false}
                style={styles.imagePickerBox}
              />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Dishes Section */}
          <View style={styles.dishesContainer}>
            <Text style={styles.label}>Dishes You Like</Text>
            <View style={styles.dishesList}>
              {dishes.map((dish, index) => (
                <View key={index} style={styles.dishPill}>
                  <Text style={styles.dishText}>{dish}</Text>
                  <TouchableOpacity onPress={() => handleRemoveDish(index)}>
                    <FontAwesome name="times-circle" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}

              {isAddingDish ? (
                <TextInput
                  style={styles.dishInput}
                  value={dishInputText}
                  onChangeText={setDishInputText}
                  onSubmitEditing={handleAddDish}
                  autoFocus
                  returnKeyType="done"
                />
              ) : (
                dishes.length < 10 && (
                  <TouchableOpacity
                    style={styles.addDishButton}
                    onPress={() => setIsAddingDish(true)}
                  >
                    <FontAwesome name="plus" size={20} color="#FF9900" />
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.button, dishes.length === 0 && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={dishes.length === 0}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1, // Ensures the container takes up the full screen
    paddingHorizontal: 30,
    paddingVertical: 0,
    justifyContent: 'space-between', // Distributes space between content and button
  },
  contentContainer: {
    flex: 1, // Occupies the available space above the button
    justifyContent: 'flex-start',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20, // Adjusted for better top spacing
    marginBottom: 10,
    paddingVertical: 25,
  },
  logo: {
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FF9900',
    textAlign: 'center',
    lineHeight: 34, // Adjust line height for better spacing
  },
  bioAndPfpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to the top
    marginTop: -20,
  },
  bioContainer: { 
    flex: 1,
    marginRight: 15, // Space between bio and profile picture
  },
  label: { 
    marginBottom: 5, 
    fontWeight: 'bold',
    color: '#333', // Ensure label is readable
  },
  bioInput: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10, 
    padding: 10, 
    height: 100, // Increased height for better usability
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  pfpContainer: { 
    width: 110, // Fixed width to match image size
    alignItems: 'center',
  },
  imagePickerBox: { 
    height: 110, 
    width: 110, 
    borderRadius: 15, // Rounded corners
    overflow: 'hidden',
    marginTop: -3,
  },
  divider: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  dishesContainer: {
    // Additional styling if needed
  },
  dishesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  dishPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9900',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  dishText: {
    color: '#fff',
    marginRight: 5,
  },
  addDishButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF9900',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dishInput: {
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#FF9900',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF9900',
    paddingVertical: 12, // Maintains button height
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
