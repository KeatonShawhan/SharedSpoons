import { PropsWithChildren } from 'react';
import { Image, View, Text} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { addButton } from './addButton';
import { postCaption } from './postCaption';

export function postDescription({categories, notes, dish}: { categories: string[], dish:string, notes:string}) {

  const catString = categories.join(', ');

  return (
    <ThemedView >
      <View style={{position: 'relative', width: '100%', height: 500, borderWidth: 2, borderColor: 'black', borderRadius:5}}>
        <View style={{position: 'relative', padding: 20}}>
          <Text style={{fontWeight:'bold', fontSize: 24, flexWrap:'wrap'}}>
            {dish}
          </Text>
          <Text style={{fontSize: 16, flexWrap:'wrap', paddingTop: 10}}>
            Categories: {catString}
          </Text>
          <Text style={{fontSize: 16, flexWrap:'wrap', paddingTop: 10}}>
            Additional Notes: {notes}
          </Text>
          
        </View>
      </View>
    </ThemedView>
  );
}