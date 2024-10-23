import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Text , View} from 'react-native';

import { starDisplay } from './starDisplay';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import {Avatar, Card } from 'react-native-paper';


export function postCaption({ children, caption, dish, rating }: PropsWithChildren & { caption: string, dish:string, rating:number }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
      <ThemedView >
        <View style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
          {starDisplay({rating: rating})}
          <Text style={{paddingLeft: 5, fontSize: 16, fontWeight:'bold'}}>
            {dish}
          </Text>
        </View>
        <Text style={{paddingLeft: 5, paddingTop: 5, fontSize: 16, color:"grey"}}>
          {caption}
        </Text>
      </ThemedView>
  );
}
