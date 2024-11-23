// components/toEatCard/toEatDetails.tsx
import React from 'react';
import { View } from 'react-native';
import { PostCard, PostCardProps } from '../postCard/postCard';
import { postEatButton } from './postEatButton';

// Extend PostCardProps to include onProfilePress
/* eslint-disable */
interface ToEatDetailsInfoProps extends PostCardProps {
  onProfilePress?: () => void;
}

export function ToEatDetailsInfo({ onProfilePress, ...postProps }: ToEatDetailsInfoProps) {

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
      <View style={{ width: '95%', borderRadius: 0, borderColor: 'none' }}>
        <PostCard 
          {...postProps}
          isSaved
          parentTab="ToEatTab"
        />
        <View>
          {postEatButton()}
        </View>
      </View>
    </View>
  );
}
/* eslint-enable */