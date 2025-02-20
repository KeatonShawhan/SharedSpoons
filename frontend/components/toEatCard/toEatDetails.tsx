// components/toEatCard/toEatDetails.tsx
import React from 'react';
import { View } from 'react-native';
import { PostCard, PostCardProps } from '../postCard/postCard';
import { postEatButton } from './postEatButton';
import { ToEatScreenNavigationProp } from '@/app/(tabs)/toeat';

// Extend PostCardProps to include onProfilePress
/* eslint-disable */
interface ToEatDetailsInfoProps extends PostCardProps {
  navigation: ToEatScreenNavigationProp
}

export function ToEatDetailsInfo({navigation, ...postProps}: ToEatDetailsInfoProps) {

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
      <View style={{ width: '95%', borderRadius: 0, borderColor: 'none' }}>
        <PostCard 
          {...postProps}
          isSaved
          parentTab="ToEatTab"
        />
        <View>
          {postEatButton(navigation, postProps.dish, postProps.place, postProps.user_id, postProps.id)}
        </View>
      </View>
    </View>
  );
}
/* eslint-enable */