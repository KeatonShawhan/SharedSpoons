// app/components/explore/ExplorePostSquare.tsx

import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

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

  // Calculate dynamic height based on heightRatio
  const IMAGE_WIDTH = (Dimensions.get('window').width - 32) / 3; // 8px padding on each side and between columns (3 columns: 8*4 = 32)
  const IMAGE_HEIGHT = IMAGE_WIDTH * heightRatio;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: resolvedUri }}
        style={[styles.image, { width: IMAGE_WIDTH, height: IMAGE_HEIGHT }]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e1e4e8', // Placeholder color while loading
    borderColor: 'black',
    borderWidth: .5,
  },
  image: {
    resizeMode: 'cover',
  },
});
