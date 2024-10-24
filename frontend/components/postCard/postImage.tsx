import { PropsWithChildren } from 'react';
import { Image, View} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { addButton } from './addButton';
import { postCaption } from './postCaption';

export function postImage({image}: { image:string }) {
  return (
      <ThemedView >
        <View>
          <View style={{position: 'relative', width: '100%', height: 500}}>
            <Image
              style={{width: '100%', height: 500, borderRadius: 5}}
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
