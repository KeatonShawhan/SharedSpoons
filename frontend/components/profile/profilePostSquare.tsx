import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Add onPress prop to the component's function signature
const ProfilePostSquare = ({ onPress }) => {
  return (
    // Wrap the View in a TouchableOpacity to make it clickable
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.blackSquare} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width / 3) - 6, // Adjust width to account for padding, assuming 3 posts per row
    height: (width / 3) - 6, // Keep square aspect ratio, subtract the same amount as width for padding
    padding: 5, // Maintain a small padding within each square
  },
  blackSquare: {
    flex: 1,
    backgroundColor: 'black', // Inner content is black
    borderRadius: 10,
  },
});

export default ProfilePostSquare;
