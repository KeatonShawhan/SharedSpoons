import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Text, View, Image } from 'react-native';
import { postHeader } from './postHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import {Card } from 'react-native-paper';
import { postCaption } from './postCaption';
import { starDisplay } from './starDisplay';
import { addButton } from './addButton';


export function postCard({ children, caption, rating, dish, username, place, image }: PropsWithChildren & {caption:string, rating:number, dish:string, username:string, place:string, image:string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={{justifyContent:'center', alignItems:'center', paddingBottom:30}}>
      <View style={{width: "95%", borderRadius: 0, borderColor:"none"}}>
        <View style={{paddingBottom:10}}>
          {postHeader({username: username, place:place})}
        </View>
        <View style={{position: 'relative', width: '100%', height: 500}}>
          <Image
            style={{width: '100%', height: 500, borderRadius: 5}}
            source={{
              uri: image,
            }}
          />
          {addButton()}
          
          
        </View>
        <View style={{paddingTop:8, display:'flex', flexDirection:'row', gap:10, flexWrap:'wrap'}}>
          {postCaption({caption: caption, dish: dish, rating: rating})}
        </View>
      </View>
    </View>
  );
}
