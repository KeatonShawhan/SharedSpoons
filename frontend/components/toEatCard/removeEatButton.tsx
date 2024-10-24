import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export function removeEatButton() {
  return (
    <TouchableOpacity
      onPress={() => {}} 
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
        <View style={{borderRadius: 5, width: '90%', borderColor:'orange', borderWidth:2, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{padding: 10, fontSize:18, fontWeight: 'bold', color:'orange'}}>
            Remove this Eat from your list
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
