import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Text , View} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import {Avatar, Card } from 'react-native-paper';


export function postHeader({ children, username }: PropsWithChildren & { username: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <View style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
        <Avatar.Icon size={42} icon="heart" />
        <View>
          <Text style={{paddingLeft:10, paddingTop:0, fontSize: 16}}>
            {username}
          </Text>
          <Text style={{paddingLeft:10, paddingTop:0, fontSize: 14, color:'grey'}}>
            Pizza Hut
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}
