// ProfilePostSquare.tsx
/*
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

const { width } = Dimensions.get('window');

interface ProfilePostSquareProps {
  imageUrl: string,
  color: string;
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

export default ProfilePostSquare;*/
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProfilePostSquare: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.blackSquare} />
    </View>
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

