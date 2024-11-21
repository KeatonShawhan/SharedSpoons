// app/components/explore/ExplorePostSquare.tsx

import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = 2;
const spacing = 8;
const imageWidth = (width - (numColumns + 1) * spacing) / numColumns;

interface ExplorePostSquareProps {
  imageUrl: string;
  onPress: () => void;
  heightRatio?: number;
}

export default function ExplorePostSquare({
    imageUrl,
    onPress,
    heightRatio = 1.0,
  }: ExplorePostSquareProps) {
    // Determine if the imageUrl is a valid URL or base64 string
    const isBase64 = imageUrl.startsWith('data:image') || imageUrl.startsWith('/');
    const resolvedUri = isBase64
      ? imageUrl
      : imageUrl.startsWith('http')
      ? imageUrl
      : `data:image/jpeg;base64,${imageUrl}`;
  
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image
          source={{ uri: resolvedUri }}
          style={[styles.image, { height: imageWidth * heightRatio }]}
        />
      </TouchableOpacity>
    );
  }
  

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing,
    marginLeft: spacing,
    flex: 1,
  },
  image: {
    width: imageWidth,
    borderRadius: 8,
    resizeMode: 'cover',
    backgroundColor: '#e1e4e8', // Placeholder color while loading
  },
});
