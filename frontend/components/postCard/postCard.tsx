// components/post/postCard.tsx
import React, { useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postHeader } from './postHeader';
import { postImage } from './postImage';
import { postCaption } from './postCaption';
import { postDescription } from './postDescription';
import { postActions } from './postActions';
import type { HomeScreenNavigationProp } from '@/app/(tabs)';

interface postCardProps {
  id: string;
  username: string;
  caption: string;
  dish: string;
  rating: number;
  place: string;
  image: string;
  categories: string[];
  notes: string;
  likes?: number;
  commentsCount?: number;
}

export function postCard({
  id,
  username,
  caption,
  dish,
  rating,
  place,
  image,
  categories,
  notes,
  likes = 0,
  commentsCount = 0,
}: postCardProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isFlipped, setIsFlipped] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

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
        <View style={{ paddingBottom: 10, paddingLeft: 0 }}>
          {postHeader({ username, place })}
        </View>

        <TouchableOpacity onPress={handlePress}>
          <View style={{ position: 'relative' }}>
            <Animated.View style={{ opacity: fadeAnim }}>
              {postImage({ image })}
            </Animated.View>

            <Animated.View style={{
              opacity: isFlipped ? 1 : 0,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}>
              {postDescription({ categories, dish, notes })}
            </Animated.View>
          </View>
        </TouchableOpacity>

        <View style={{ paddingTop: 15, paddingLeft: 0 }}>
          {postCaption({
            caption,
            dish,
            rating,
            postId: id,
            likes,
            commentsCount,
            navigation, // Pass navigation as a prop
          })}
        </View>
      </View>
    </View>
  );
}
