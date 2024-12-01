import { ToEatScreenNavigationProp } from '@/app/(tabs)/toeat';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


export function postEatButton(navigation:ToEatScreenNavigationProp, dish:string, place:string, user_id:string, postId: string) {

  const postEat = () =>  {
    navigation.navigate("MakePostRoot", {repostDish: dish, repostRestaurant:place, repostId:user_id, postId: postId})
  }
  return (
    <TouchableOpacity
      onPress={postEat} 
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20}}>
        <View style={{borderRadius: 5, width: '90%', backgroundColor:'orange',  justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{padding: 10, fontSize:18, fontWeight: 'bold', color: 'white'}}>
            Post this Eat
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
