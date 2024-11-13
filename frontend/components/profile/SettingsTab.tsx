// /Users/keaton/cse115a/SharedSpoons/frontend/components/profile/SettingsTab.tsx

import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ImagePickerBox } from '@/components/makePost/ImagePickerBox';

interface SettingsTabProps {
  userName: string;
  bio: string;
  colorScheme: 'light' | 'dark';
}

const SettingsTab: React.FC<SettingsTabProps> = ({ userName, bio, colorScheme }) => {
  // State variables for the settings
  const [username, setUsername] = useState(userName);
  const [bioText, setBioText] = useState(bio);
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSave = () => {
    // For now, just log the values
    console.log('Saving settings:', { username, bio: bioText, location, profilePicture });
    // Later, make API calls to save the settings
  };

  return (
    <ScrollView style={styles.settingsContainer} contentContainerStyle={styles.scrollContent}>
      {/* Username Field */}
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
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none" // Ensure first letter isn't capitalized
        />
      </View>

      {/* Bio Field */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Bio</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
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

      {/* Location Field */}
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

      {/* Profile Picture Picker */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>Profile Picture</Text>
        <ImagePickerBox
          selectedImage={profilePicture}
          setSelectedImage={setProfilePicture}
          isDisabled={false}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
);

};

export default SettingsTab;

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // For Android to align text at the top
  },
  button: {
    backgroundColor: '#FF9F45',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30, // Added extra margin at the bottom
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  imageUploadText: {
    marginLeft: 10,
  },
});
