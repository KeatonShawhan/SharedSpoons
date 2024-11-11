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
import { getComment, getCommentCount} from './screens/commentHelper';
import LoginContext from '@/contexts/loginContext';
import { addToEat } from '@/app/pages/toeat/toEatHelper';
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
  parentTab: 'HomeTab' | 'ProfileTab' | 'ToEatTab' | 'ExploreTab';
}

export function PostCaption({
  dish,
  rating,
  postId,
  navigation,
  parentTab,
}: PostCaptionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const loginContext = useContext(LoginContext)

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(postId);
    addToEat(postId, loginContext.accessToken)
  };

  const handleComment = () => {
    navigation.navigate('PostStack', {
      screen: 'Comments',
      params: { postId, parentTab },
    });
  };

  useEffect( ()=>{
    const fetchData = async () => {
      console.log(postId)
      const commentList = await getCommentCount(postId, loginContext.accessToken)
      setCommentCount(commentList)
      console.log("amt: " + commentList)
    }
    fetchData();
  }, [postId])

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
            {likeCount > 0 && <Text style={{ fontSize: 14, color: 'gray', marginLeft: 4 }}>{likeCount}</Text>}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <TouchableOpacity onPress={handleComment}>
              <Ionicons name="chatbubble-outline" size={22} color="gray" />
            </TouchableOpacity>
            {commentCount > 0 && <Text style={{ fontSize: 14, color: 'gray', marginLeft: 4 }}>{commentCount}</Text>}
          </View>

          <TouchableOpacity onPress={handleSave}>
            <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={22} color={isSaved ? ORANGE_COLOR : 'gray'} />
          </TouchableOpacity>
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
