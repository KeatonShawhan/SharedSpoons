// components/post/postImage.tsx
import { PropsWithChildren } from 'react';
import { Image, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { addButton } from './addButton';

interface postImageProps {
  image: string;
}

export function postImage({ image }: postImageProps): React.JSX.Element {
  return (
    <ThemedView>
      <View>
        <View style={{position: 'relative', width: '100%', height: 350, paddingHorizontal: 8, paddingVertical: 3}}>
          <Image
            style={{width: '100%', height: 350, borderRadius: 20}}
            source={{
              uri: image,
            }}
          />
          {addButton()}
        </View>
      </View>
    </ThemedView>
  );
}
