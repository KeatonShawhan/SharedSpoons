import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, PropsWithChildren } from 'react';
import { Animated, TouchableOpacity, useColorScheme, View, Text, Image } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export function toEatCard({notes, categories, caption, rating, dish, username, place, image }: Post){

  const [isFlipped, setIsFlipped] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; 

  const theme = useColorScheme() ?? 'light';


  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
      <View style={{height: 120, width: "95%", borderRadius: 5, borderColor: "black", borderWidth: 1, display: 'flex', flexDirection: 'row', position: 'relative'}}>
        <View style={{ top: 10, left: 10, paddingRight: 10 }}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 5 }}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={{display:'flex', flexDirection:'column', flex:1}}>
          <Text style={{ padding: 10, fontWeight: 'bold', fontSize: 20, marginRight: 40 }} numberOfLines={2} ellipsizeMode="tail">
            {dish}
          </Text>
          <Text style={{ paddingLeft: 10, fontSize: 16, marginRight: 40, color:'grey'}} numberOfLines={2} ellipsizeMode="tail">
            {place}
          </Text>
        </View>


        <View style={{ position: 'absolute', right: 20, justifyContent: 'center', height: '100%' }}>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </View>
      </View>
    </View>
  );
}