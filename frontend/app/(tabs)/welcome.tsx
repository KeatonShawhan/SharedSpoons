import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  Image, // Import Image component
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Retain if still used for other icons
import API_URL from "@/config";
import { useNavigation } from "@react-navigation/native";
import { RootTabParamList } from './_layout';
import { StackNavigationProp } from "@react-navigation/stack";
import { ImagePickerBox } from '@/components/makePost/ImagePickerBox'; // Adjust the import path as necessary
import LoginContext from "@/contexts/loginContext";

// Import your custom logo image
/* eslint-disable */
const LogoImage = require('../../assets/images/FullSpoonsLogo.png'); // Adjust the path if necessary
/* eslint-enable */

export default function Welcome() {

  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>();

  const [bioText, setBioText] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [dishes, setDishes] = useState<string[]>([]);
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [dishInputText, setDishInputText] = useState('');
  const loginContext = useContext(LoginContext);

  const handleContinue = () => {
    if (dishes.length === 0) {
      Alert.alert('Validation Error', 'Please add at least one dish you like.');
      return;
    }
    handleSave();
    navigation.navigate('index');
  };

  const handleSave = async () => {
    if (!bioText.trim() && !profilePicture) {
      Alert.alert('Incomplete Information', 'Please update at least one field.');
      return;
    }
  
    const updateRequest = {
      bio: bioText.trim()
    };
  
    const formData = new FormData();
  
    formData.append('updateRequest', JSON.stringify(updateRequest));
    if (profilePicture) {
      /* eslint-disable */
      formData.append('file', {
        uri: profilePicture,
        name: 'profilePicture.jpg',
        type: 'image/jpeg',
      } as any);
      /* eslint-enable */
    }
  
    try {
      const response = await fetch(`${API_URL}account/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${loginContext.accessToken}`,
        },
        body: formData,
      });
  
      const json = await response.json();

      if (response.ok) {
        Alert.alert('Welcome To SharedSpoons!');
        setBioText('');
        setDishes([]);
        setProfilePicture(null);
        loginContext.triggerProfilePageRefresh();
      } else {
        Alert.alert('Error', json.message || 'Failed to update account. Please try again.');
      }      
      /* eslint-disable */
    } catch (error: any) {
      /* eslint-enable */
      console.error('Update error:', error);
      if (error.message.includes("401")) {
        loginContext.handleLogout();
        return;
      }
      Alert.alert('An Error Occurred', 'Unable to update account. Please try again.');
    }
  };


  const handleAddDish = () => {
    if (dishInputText.trim() === '') {
      setIsAddingDish(false);
      setDishInputText('');
      return;
    }
    if (dishes.length >= 10) {
      Alert.alert('Limit Reached', 'You can only add up to 10 dishes.');
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
            {/* App Logo */}
            <Image
              source={LogoImage}
              style={styles.logo}
            />
            {/* App Name */}
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
                placeholderTextColor="#999"
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
                  placeholder="Add dish"
                  placeholderTextColor="#999"
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
    width: 60, // Adjust based on your logo image dimensions
    height: 60, // Adjust based on your logo image dimensions
    marginBottom: 10,
    resizeMode: 'contain', // Ensures the image scales correctly
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
    color: '#333',
    fontSize: 16,
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
