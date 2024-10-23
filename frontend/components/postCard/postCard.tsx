import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Text, View, Image } from 'react-native';
import { postHeader } from './postHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import {Card } from 'react-native-paper';
import { postCaption } from './postCaption';


export function postCard({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={{justifyContent:'center', alignItems:'center', paddingBottom:30}}>
      <View style={{width: "95%", borderRadius: 0, borderColor:"none"}}>
        <View style={{paddingBottom:10}}>
          {postHeader({username: "Zoe Feller"})}
        </View>
        <Image
          style={{width:"100%", height: 300, borderRadius: 5}}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU',
          }}
        />
        <View style={{paddingTop:5}}>
          {postCaption({caption: "cat :3"})}
        </View>
      </View>
    </View>
  );
}
