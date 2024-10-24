import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, PropsWithChildren } from 'react';
import { Animated, TouchableOpacity, useColorScheme, View, Text } from 'react-native';
import { postHeader } from './postHeader';

import { postImage } from './postImage';
import { postCaption } from './postCaption';
import { postDescription } from './postDescription';



export function postCard({notes, categories, caption, rating, dish, username, place, image }: Post) {
  const [isFlipped, setIsFlipped] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; 

  const theme = useColorScheme() ?? 'light';

  const handlePress = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(fadeAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
      <View style={{ width: "95%", borderRadius: 0, borderColor: "none" }}>
        
        <View style={{ paddingBottom: 10 }}>
          {postHeader({ username: username, place: place })}
        </View>
        
        <TouchableOpacity onPress={handlePress}>
          <View style={{ position: 'relative' }}>

            {/* Front Side - Image */}
            <Animated.View style={{ opacity: fadeAnim }}>
              {postImage({ image: image })}
            </Animated.View>

            {/* Back Side - Description */}
            <Animated.View 
              style={{ 
                opacity: isFlipped ? 1 : 0, 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0 
              }}>

              {postDescription({categories:categories, dish: dish, notes:notes})}
            </Animated.View>
          </View>
        </TouchableOpacity>

        <View style={{ paddingTop: 8, display: 'flex', flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          {postCaption({ caption: caption, dish: dish, rating: rating })}
        </View>
      </View>
    </View>
  );
}