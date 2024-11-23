// components/post/postImage.tsx
import React from 'react';
import { Image, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

interface postImageProps {
  image: string;
}

export function postImage({ image }: postImageProps): React.JSX.Element {
  return (
    <ThemedView>
      <View style={{ position: 'relative', width: '100%', height: 375, paddingHorizontal: 0, paddingVertical: 0 }}>
        <Image
          style={{ width: '100%', height: 375, borderRadius: 20 }}
          source={{ uri: image }}
        />
      </View>
    </ThemedView>
  );
}
