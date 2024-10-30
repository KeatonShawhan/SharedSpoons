// components/post/postActions.tsx
import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ORANGE_COLOR = '#FF9F45';

interface postActionsProps {
  likes?: number;
  commentsCount?: number;
  onLike: () => void;
  onComment: () => void;
  onSave: () => void;
}

export function postActions({
  likes = 0,
  commentsCount = 0,
  onLike,
  onComment,
  onSave
}: postActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike();
  };

  const handleSavePress = () => {
    setIsSaved(!isSaved);
    onSave();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 15 }}>
      {/* Like Button */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <TouchableOpacity onPress={handleLikePress}>
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? ORANGE_COLOR : 'gray'} />
        </TouchableOpacity>
        {likeCount > 0 && <Text style={{ fontSize: 14, color: 'gray', marginLeft: 2 }}>{likeCount}</Text>}
      </View>

      {/* Comment Button */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <TouchableOpacity onPress={onComment}>
          <Ionicons name="chatbubble-outline" size={22} color="gray" />
        </TouchableOpacity>
        {commentsCount > 0 && <Text style={{ fontSize: 14, color: 'gray', marginLeft: 2 }}>{commentsCount}</Text>}
      </View>

      {/* Save Button */}
      <TouchableOpacity onPress={handleSavePress}>
        <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={22} color={isSaved ? ORANGE_COLOR : 'gray'} />
      </TouchableOpacity>
    </View>
  );
}
