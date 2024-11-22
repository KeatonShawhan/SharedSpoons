// components/post/postCaption.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { starDisplay } from './starDisplay';
import { ThemedView } from '@/components/ThemedView';
import { CompositeNavigationProp } from '@react-navigation/native';
import type { HomeScreenNavigationProp } from '@/app/(tabs)';
import { ProfileScreenNavigationProp } from '@/app/pages/profile/profileNavigation';
import type { ToEatScreenNavigationProp } from '@/app/(tabs)/toeat'; 
import {getCommentCount} from './screens/commentHelper';
import LoginContext from '@/contexts/loginContext';
import { addToEat, deleteToEat, likeCount, likePost, unlikePost } from '@/app/pages/toeat/toEatHelper';
const ORANGE_COLOR = '#FF9F45';

type CombinedNavigationProp = CompositeNavigationProp<
  CompositeNavigationProp<HomeScreenNavigationProp, ProfileScreenNavigationProp>,
  ToEatScreenNavigationProp
>;

interface PostCaptionProps {
  dish: string;
  rating: number;
  postId: string;
  navigation: CombinedNavigationProp;
  isSaved:boolean;
  userId: string;
  parentTab: 'HomeTab' | 'ProfileTab' | 'ToEatTab' | 'ExploreTab';
}

export function PostCaption({
  dish,
  rating,
  postId,
  navigation,
  parentTab,
  isSaved, 
  userId
}: PostCaptionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [saved, setSaved] = useState(isSaved);
  const [likesCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const loginContext = useContext(LoginContext)
  const handleLike = async () => {
    if (!loginContext) return;
  
    try {
      if (isLiked) {
        await unlikePost(postId, loginContext.accessToken);
        loginContext.triggerToEatRefresh();
      } else {
        await likePost(postId, loginContext.accessToken);
        loginContext.triggerToEatRefresh(); 
      }
      setIsLiked(!isLiked);
      loginContext.setLiked(!loginContext.liked)
    } catch (err) {
      console.error('Error updating To-Eat:', err);
    }
  };

  const handleSave = async () => {
    if (!loginContext) return;
  
    try {
      if (saved) {
        await deleteToEat(postId, loginContext.accessToken);
        loginContext.triggerToEatRefresh(); 
      } else {
        await addToEat(postId, loginContext.accessToken);
        loginContext.triggerToEatRefresh(); 
      }
      loginContext.setAddedEat(loginContext.addedEat += 1)
      setSaved(!saved);
    } catch (err) {
      console.error('Error updating To-Eat:', err);
    }
  };
  
  

  const handleComment = () => {
    navigation.navigate('PostStack', {
      screen: 'Comments',
      params: { postId, parentTab },
    });
  };

  useEffect( ()=>{
    const fetchData = async () => {
      const commentList = await getCommentCount(postId, loginContext.accessToken)
      setCommentCount(commentList)
    }
    fetchData();
  }, [postId, loginContext.commented])

  useEffect( ()=>{
    const fetchData = async () => {
      const countlikes = await likeCount(postId, loginContext.accessToken)
      setLikeCount(countlikes)
    }
    fetchData();
  }, [postId, loginContext.liked])

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <TouchableOpacity onPress={handleLike}>
              <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? ORANGE_COLOR : 'gray'} />
            </TouchableOpacity>
            {likesCount > 0 && <Text style={{ fontSize: 14, color: 'gray', marginLeft: 4 }}>{likesCount}</Text>}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <TouchableOpacity onPress={handleComment}>
              <Ionicons name="chatbubble-outline" size={22} color="gray" />
            </TouchableOpacity>
            {commentCount > 0 && <Text style={{ fontSize: 14, color: 'gray', marginLeft: 4 }}>{commentCount}</Text>}
          </View>
            { loginContext.userId != userId &&
              (
              <TouchableOpacity onPress={handleSave}>
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={22} color={saved ? ORANGE_COLOR : 'gray'} />
              </TouchableOpacity>
              )
            }
        </View>
      </View>
      <View>
        <Text style={{paddingTop: 10, fontSize: 16, fontWeight:"bold"}}>
          {dish}
        </Text>
      </View>
    </ThemedView>
  );
}
