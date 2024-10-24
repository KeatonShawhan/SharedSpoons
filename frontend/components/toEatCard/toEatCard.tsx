import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export function toEatCard({id, dish, place, image, navigation }: {dish: string, place:string, image:string, id:uuidv4, navigation:any}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostDetails', { uuid: id })} 
    >
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
    </TouchableOpacity>
  );
}
