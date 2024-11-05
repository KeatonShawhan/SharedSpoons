import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

interface ProfilePostSquareProps {
  onPress: () => void;
  imageUrl?: string;
}

const ProfilePostSquare: React.FC<ProfilePostSquareProps> = ({ onPress, imageUrl }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.blackSquare} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width / 3) - 6,
    height: (width / 3) - 6,
    padding: 5,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#333', // Placeholder color while loading
  },
  blackSquare: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 10,
  },
});

export default ProfilePostSquare;