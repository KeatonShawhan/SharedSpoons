import { PropsWithChildren, useState } from 'react';
import { useColorScheme, Text , View} from 'react-native';

import { starDisplay } from './starDisplay';
import { ThemedView } from '@/components/ThemedView';



export function postCaption({caption, dish, rating }: { caption: string, dish:string, rating:number }) {
  return (
      <ThemedView >
        <View style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
          {starDisplay({rating: rating})}
          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 10,
              fontSize: 16,
              fontWeight: 'bold',
              maxWidth: '65%', 
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {dish}
          </Text>
        </View>
        <Text style={{paddingLeft: 5, paddingTop: 5, fontSize: 16, color:"grey"}}>
          {caption}
        </Text>
      </ThemedView>
  );
}
