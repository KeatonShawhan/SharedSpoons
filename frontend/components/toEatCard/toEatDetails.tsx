// components/toEatCard/toEatDetails.tsx
import React from 'react';
import { View } from 'react-native';
import { PostCard } from '../postCard/postCard';
import { postEatButton } from './postEatButton';
import { removeEatButton } from './removeEatButton';
import type { PostCardProps } from '../postCard/postCard';

export function ToEatDetailsInfo(props: PostCardProps) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
      <View style={{ width: '95%', borderRadius: 0, borderColor: 'none' }}>
        <PostCard {...props} />
        <View>
          {postEatButton()}
          {removeEatButton()}
        </View>
      </View>
    </View>
  );
}