import React, { useState, useContext, useEffect } from 'react';
import { Animated, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming react-native-vector-icons is installed
import { postHeader } from './postHeader';
import { postImage } from './postImage';
import { PostCaption } from './postCaption';
import { postDescription } from './postDescription';
import type { HomeScreenNavigationProp } from '@/app/(tabs)';
import { ProfileScreenNavigationProp } from '@/app/pages/profile/profileNavigation';
import type { ToEatScreenNavigationProp } from '@/app/(tabs)/toeat';
import API_URL from '@/config';
import LoginContext from '@/contexts/loginContext';
import {fetchAllPosts, fetchUserInfo} from '../../app/pages/profile/profileHelpers'
import { useCallback } from 'react';
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
  isLiked: boolean;
  pfp: string;
  parentTab: 'HomeTab' | 'ProfileTab' | 'ToEatTab' | 'ExploreTab';
  isOwnProfile: boolean;
  isReposted:boolean;
  repostedBy:string;
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
  pfp,
  isLiked,
  isOwnProfile,
  isReposted, 
  repostedBy,
}: PostCardProps) {
  const navigation = useNavigation<CombinedNavigationProp>();
  const [isFlipped, setIsFlipped] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const loginContext = useContext(LoginContext);
  const [repostUserName, setRepostUserName] = useState('')

  const handlePress = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(fadeAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}post/delete?postID=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginContext.accessToken}`,
        },
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      Alert.alert('Success', 'Post deleted successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('ProfileRoot', { screen: 'Main' });
            fetchAllPosts(id, loginContext.accessToken, loginContext.handleLogout);
          },
        },
      ]);
      loginContext.triggerProfilePageRefresh();
    } catch (error) {
      console.error('Error deleting post:', error);
      Alert.alert('Error', 'Could not delete the post. Please try again later.');
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDelete },
      ],
      { cancelable: true }
    );
  };

  const handleNavigateToProfile = (newId:string) => {
    switch (parentTab) {
      case 'HomeTab':
        navigation.push('ProfileTab', {
          screen: 'ProfileRoot',
          params: {
            screen: 'Main',
            params: { 
              userId: newId,
              isFromHomeTab: true
            }
          },
          isFromHomeTab: true
        });
        break;

      case 'ProfileTab':
        navigation.push('ProfileRoot', {
          screen: 'Main',
          params: {
            userId: newId,
          }
        });
        break;

      case 'ToEatTab':
        navigation.push('ProfileRoot', {
          screen: 'Main',
          params: {
            userId: newId,
          }
        });
        break;

      case 'ExploreTab':
        navigation.push('ProfileRoot', {
          screen: 'Main',
          params: {
            userId: newId,
          }
        });
        break;

      default:
        console.warn('Unknown parent tab:', parentTab);
    }
  };

  useEffect(() => {
    if(isReposted) {
      fetchPostData();
    }
  }, []);

  const fetchPostData = async () => {
    const userInfo = await fetchUserInfo(repostedBy, loginContext.accessToken, ()=>{});
    setRepostUserName(userInfo.username);
    return userInfo
  }

  const repostNavigation = useCallback(() => handleNavigateToProfile(repostedBy), [repostedBy]);


  return (
    <View style={styles.cardContainer}>
      {isOwnProfile && (
        <TouchableOpacity style={styles.trashIcon} onPress={confirmDelete}>
          <Icon name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      )}
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => handleNavigateToProfile(user_id)}>
          <View style={styles.headerContainer}>
            {postHeader({ username, place, user_id, onNavigateToProfile: () => handleNavigateToProfile(user_id), pfp })}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <View style={{ position: 'relative' }}>
            <Animated.View style={{ opacity: fadeAnim }}>{postImage({ image })}</Animated.View>
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
        <View style={styles.captionContainer}>
          <PostCaption
            dish={dish}
            rating={rating}
            postId={id}
            navigation={navigation}
            parentTab={parentTab}
            isSaved={isSaved}
            userId={user_id}
            isLiked={isLiked}
            repostNavigation={repostNavigation}
            username={repostUserName}
            isReposted={isReposted}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  contentContainer: {
    width: '98%',
    borderRadius: 0,
    borderColor: 'none',
  },
  headerContainer: {
    paddingBottom: 15,
    paddingLeft: 0,
  },
  captionContainer: {
    paddingTop: 15,
    paddingHorizontal: 5,
  },
  trashIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
