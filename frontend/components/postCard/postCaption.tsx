import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Text , View} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import {Avatar, Card } from 'react-native-paper';


export function postCaption({ children, caption }: PropsWithChildren & { caption: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
      <ThemedView>
        <View style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
          <Text style={{paddingLeft: 5, fontSize: 16}}>
            {caption}
          </Text>
        </View>
      </ThemedView>
  );
}
