// components/post/postCaption.tsx
import { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { starDisplay } from './starDisplay';
import { ThemedView } from '@/components/ThemedView';
import type { HomeScreenNavigationProp } from '@/app/(tabs)';

const ORANGE_COLOR = '#FF9F45';

interface postCaptionProps {
  caption: string;
  dish: string;
  rating: number;
  postId: string;
  likes?: number;
  commentsCount?: number;
  navigation: HomeScreenNavigationProp; // Accept navigation as a prop
}

export function postCaption({
  caption,
  dish,
  rating,
  postId,
  likes = 0,
  commentsCount = 0,
  navigation,
}: postCaptionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    // TODO: Add API call to update like status
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Add API call to update to-eat list
  };

  const handleComment = () => {
    navigation.navigate('Comments', { postId });
  };

  return (
    <ThemedView>
      {/* Rating, Dish Name, and Action Buttons */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left Section: Rating and Dish Name */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {starDisplay({ rating })}
          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 10,
              fontSize: 16,
              fontWeight: 'bold',
              maxWidth: '65%',
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
          </Text>
        </View>

        {/* Right Section: Like, Comment, and Save Buttons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          {/* Like Button */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <TouchableOpacity onPress={handleLike}>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={24}
                color={isLiked ? ORANGE_COLOR : 'gray'}
              />
            </TouchableOpacity>
            {likeCount > 0 && (
              <Text style={{
                fontSize: 14,
                color: 'gray',
                marginLeft: 2,
              }}>
                {likeCount}
              </Text>
            )}
          </View>

          {/* Comment Button */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <TouchableOpacity onPress={handleComment}>
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color="gray"
              />
            </TouchableOpacity>
            {commentsCount > 0 && (
              <Text style={{
                fontSize: 14,
                color: 'gray',
                marginLeft: 2,
              }}>
                {commentsCount}
              </Text>
            )}
          </View>

          {/* Save to To-Eat List Button */}
          <TouchableOpacity onPress={handleSave}>
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={isSaved ? ORANGE_COLOR : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Caption */}
      <Text style={{ paddingLeft: 5, paddingTop: 5, fontSize: 16, color: "grey" }}>
        {caption}
      </Text>
    </ThemedView>
  );
}
