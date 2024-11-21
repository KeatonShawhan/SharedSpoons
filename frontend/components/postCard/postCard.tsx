// components/post/postCard.tsx
import React, { useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { postHeader } from './postHeader';
import { postImage } from './postImage';
import { PostCaption } from './postCaption';
import { postDescription } from './postDescription';
import type { HomeScreenNavigationProp } from '@/app/(tabs)';
import { ProfileScreenNavigationProp } from '@/app/pages/profile/profileNavigation';
import type { ToEatScreenNavigationProp } from '@/app/(tabs)/toeat';

export interface PostCardProps {  
  id: string;
  username: string;
  caption: string;
  dish: string;
  user_id: string;
  rating: number;
  place: string;
  image: string;
  isSaved: boolean;
  pfp: string;
  parentTab: 'HomeTab' | 'ProfileTab' | 'ToEatTab' | 'ExploreTab';
}

// Combine navigation props to include Home, Profile, and ToEat tabs
type CombinedNavigationProp = CompositeNavigationProp<
  CompositeNavigationProp<HomeScreenNavigationProp, ProfileScreenNavigationProp>,
  ToEatScreenNavigationProp
>;

export function PostCard({
  id,
  user_id,
  username,
  caption,
  dish,
  rating,
  place,
  image,
  parentTab,
  isSaved,
  pfp
}: PostCardProps) {
  const navigation = useNavigation<CombinedNavigationProp>();
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

  const handleNavigateToProfile = () => {
    switch (parentTab) {
      case 'HomeTab':
        navigation.push('ProfileTab', {
          screen: 'ProfileRoot',
          params: {
            screen: 'Main',
            params: { 
              userId: user_id,
              isFromHomeTab: true
            }
          },
          isFromHomeTab: true
        });
        break;

      case 'ProfileTab':
        // Instead of pushing directly to Main, use the full navigation path
        navigation.push('ProfileRoot', {
          screen: 'Main',
          params: {
            userId: user_id,
          }
        });
        break;

      case 'ToEatTab':
        navigation.push('ProfileRoot', {
          screen: 'Main',
          params: {
            userId: user_id,
          }
        });
        break;

      case 'ExploreTab':
        navigation.push('ProfileRoot', {
          screen: 'Main',
          params: {
            userId: user_id,
          }
        });
        break;

      default:
        console.warn('Unknown parent tab:', parentTab);
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
      <View style={{ width: '95%', borderRadius: 0, borderColor: 'none' }}>
        <TouchableOpacity onPress={handleNavigateToProfile}>
          <View style={{ paddingBottom: 10, paddingLeft: 0 }}>
            {postHeader({ username, place, user_id, onNavigateToProfile: handleNavigateToProfile, pfp })}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePress}>
          <View style={{ position: 'relative' }}>
            <Animated.View style={{ opacity: fadeAnim }}>
              {postImage({ image })}
            </Animated.View>

            <Animated.View
              style={{
                opacity: isFlipped ? 1 : 0,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {postDescription({ caption, dish })}
            </Animated.View>
          </View>
        </TouchableOpacity>

        <View style={{ paddingTop: 15, paddingLeft: 0 }}>
          <PostCaption
            dish={dish}
            rating={rating}
            postId={id}
            navigation={navigation}
            parentTab={parentTab}
            isSaved={isSaved}
            userId={user_id}
          />
        </View>
      </View>
    </View>
  );
}