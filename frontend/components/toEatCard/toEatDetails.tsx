import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, PropsWithChildren } from 'react';
import { Animated, TouchableOpacity, useColorScheme, View, Text } from 'react-native';




export function ToEatDetailsInfo({id, notes, categories, caption, rating, dish, username, place, image}: Post) {

  const theme = useColorScheme() ?? 'light';

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
      <View style={{ width: "95%", borderRadius: 0, borderColor: "none" }}>
        <Text>{notes}</Text>
       
      </View>
    </View>
  );
}