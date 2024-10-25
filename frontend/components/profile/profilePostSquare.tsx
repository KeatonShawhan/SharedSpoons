// ProfilePostSquare.tsx
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface ProfilePostSquareProps {
  imageUrl: string;
}

const ProfilePostSquare: React.FC<ProfilePostSquareProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 3, // Assuming 3 posts per row
    height: width / 3, // Square aspect ratio
    padding: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Cover the whole area of the container without stretching
  },
});

export default ProfilePostSquare;
