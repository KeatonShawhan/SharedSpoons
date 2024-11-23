import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ImagePickerBox } from '@/components/makePost/ImagePickerBox';
import LoginContext from '@/contexts/loginContext';
import API_URL from '@/config';
// import {fetchUserInfo,} from '../../app/pages/profile/profileHelpers';

interface SettingsTabProps {
  userName: string;
  pfp: string;
  bio: string;
  colorScheme: 'light' | 'dark';
  setUsername: (username: string) => void;
  setBio: (bio: string) => void;
  setPfp: (pfp: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ pfp, setUsername, setBio, setPfp, userName, bio, colorScheme }) => {
  const loginContext = useContext(LoginContext)
  const [newUsername, setNewUsername] = useState(loginContext.userName);
  const [bioText, setBioText] = useState(bio);
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Reset fields when the component mounts
  useEffect(() => {
    setNewUsername(loginContext.userName);
    setBioText(bio);
    setPfp(pfp);
    setLocation('');
    setProfilePicture(null);
    setErrorMessage('');
    setSuccessMessage('');
  }, [userName, bio]);

  const handleSave = async () => {
    if (!newUsername.trim() && !bioText.trim() && !location.trim() && !profilePicture) {
      Alert.alert('Incomplete Information', 'Please update at least one field.');
      return;
    }
  
    if (newUsername.trim().length === 0) {
      Alert.alert('Invalid Username', 'Username cannot be empty.');
      return;
    }
  
    const updateRequest = {
      username: newUsername.trim(),
      bio: bioText.trim(),
      location: location.trim(),
    };
  
    const formData = new FormData();
  
    // Add the updateRequest as a stringified JSON object
    formData.append('updateRequest', JSON.stringify(updateRequest));
  
    // Add the profile picture if it exists
    //console.log("pfp: ",profilePicture);
    if (profilePicture) {
      /* eslint-disable */
      formData.append('file', {
        uri: profilePicture,
        name: 'profilePicture.jpg',
        type: 'image/jpeg',
      } as any);
      /* eslint-disable */
    }
  
    try {
      const response = await fetch(`${API_URL}account/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${loginContext.accessToken}`,
        },
        body: formData,
      });
  
      const responseData = await response.json();

      if (response.ok) {
        Alert.alert('Success', responseData.message || 'Account updated successfully.');
        
        // Use the updated data for the UI
        setUsername(responseData.updatedRequest.username);
        setBio(responseData.updatedRequest.bio || 'No bio available');
        setPfp(responseData.updatedRequest.profilePicture || require('../../assets/images/default.jpeg'));  // Use the updated profile picture
        setLocation(responseData.updatedRequest.location);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to update account. Please try again.');
      }
    } catch (error) {
      console.error('Update error:', error);
      if (error.message.includes("401")) {
        loginContext.handleLogout();
        return;
      }
      Alert.alert('An Error Occurred', 'Unable to update account. Please try again.');
    }
  };
    

  return (
    <ScrollView style={styles.settingsContainer} contentContainerStyle={styles.scrollContent}>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Username</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text,
              borderColor: colorScheme === 'dark' ? '#666' : '#ccc',
              backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
            },
          ]}
          placeholder="Username"
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#555'}
          value={newUsername}
          onChangeText={setNewUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Bio</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text,
              borderColor: colorScheme === 'dark' ? '#666' : '#ccc',
              backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
            },
          ]}
          placeholder="Bio"
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#555'}
          value={bioText}
          onChangeText={setBioText}
          multiline
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Location</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text,
              borderColor: colorScheme === 'dark' ? '#666' : '#ccc',
              backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
            },
          ]}
          placeholder="Location"
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#555'}
          value={location}
          onChangeText={setLocation}
          autoCapitalize="none"
        />
      </View>

      <Text style={[styles.profilePictureLabel, { color: Colors[colorScheme].text }]}>
        Profile Picture
      </Text>
      <ImagePickerBox
        selectedImage={profilePicture}
        setSelectedImage={setProfilePicture}
        isDisabled={false}
        style={styles.imagePickerBox}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  settingsContainer: { flex: 1, backgroundColor: 'transparent' },
  scrollContent: { padding: 16, paddingBottom: 80 },
  fieldContainer: { marginBottom: 15 },
  label: { marginBottom: 3, fontWeight: 'bold' },
  input: { borderWidth: 1, borderRadius: 5, padding: 10 },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#FF9F45', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20, marginBottom: 30 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  profilePictureLabel: { marginTop: 5, marginBottom: -40, fontWeight: 'bold' },
  imagePickerBox: { height: '40%', width: '40%', marginBottom: 20 },
  errorText: { color: 'red', marginBottom: 10 },
  successText: { color: 'green', marginBottom: 10 },
});
