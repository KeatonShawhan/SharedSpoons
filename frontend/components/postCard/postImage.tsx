import { PropsWithChildren } from 'react';
import { Image, View} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { addButton } from './addButton';
import { postCaption } from './postCaption';

export function postImage({image, caption, dish, rating}: PropsWithChildren & { caption: string, dish:string, image:string, rating:number}) {
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
