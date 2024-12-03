// components/post/screens/CommentsScreen.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { PostStackParamList } from '../../../app/pages/profile/navigationTypes';
import type {PostStackNavigationProp} from '../../../app/navigation/PostStackNavigator';
import { postComment, getComment } from './commentHelper';
import { useRoute, RouteProp } from '@react-navigation/native';
import LoginContext from '@/contexts/loginContext';
import { Image } from 'react-native';
import { UUID } from '../../../../backend/src/types';

interface Comment {
  data: {
    text: string;
    time: string;
  };
  firstname: string;
  lastname: string;
  pfp: string;
  post_id: UUID;
  user_id: UUID;  // This is at root level
  id: UUID;
}

type CommentsScreenRouteProp = RouteProp<PostStackParamList, 'Comments'>;

export function CommentsScreen() {
  const loginContext = useContext(LoginContext)
  const navigation = useNavigation<PostStackNavigationProp>();
  const colorScheme = useColorScheme();
  const [newComment, setNewComment] = useState('');
  const route = useRoute<CommentsScreenRouteProp>(); 
  /* eslint-disable */
  const { postId, parentTab } = route.params; 
  /* eslint-enable */
  
  const [comments, setComments] = useState<Comment[]>([]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    await postComment(postId, newComment, loginContext.accessToken);
    const commentList = await getComment(postId, loginContext.accessToken);
    setComments(commentList);
    loginContext.setCommented(!loginContext.commented);
    setNewComment('');
  };

  const handleDate = (date: string) => {
    if (!date) return 'No date available';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return 'Invalid date';
    const today = new Date();
    if (parsedDate.getDate === today.getDate && 
        parsedDate.getMonth === today.getMonth && 
        parsedDate.getFullYear === today.getFullYear) {
      return "Today";
    } else {
      return Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(parsedDate);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const commentList = await getComment(postId, loginContext.accessToken);
      setComments(commentList);
    }

    fetchData();
  }, [postId, loginContext.accessToken]);

  const handleProfilePress = (userId: UUID) => {
    navigation.push('ProfileRoot', {
      screen: 'Main',
      params: {
        userId,
        isFromComments: true
      }
    });
  };

  const renderComment = ({ item }: { item: Comment }) => {
    return (
      <View style={styles.commentContainer}>
        <View style={styles.commentHeader}>
          <TouchableOpacity 
            style={styles.leftContainer}
            onPress={() => handleProfilePress(item.user_id)}  // Use user_id directly from item
          >
            <Image 
              style={styles.profileImage}
              source={{ uri: item.pfp }}
            />
            <Text style={[styles.username, { color: Colors[colorScheme].text }]}>
              {item.firstname + " " + item.lastname}
            </Text>
          </TouchableOpacity>
          <Text style={styles.timestamp}>{handleDate(item.data.time)}</Text>
        </View>
        <Text style={[styles.commentText, { color: Colors[colorScheme].text }]}>
          {item.data.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: Colors[colorScheme].background }]} 
      edges={['top']}
    >
      {/* Header */}
      <View style={[
        styles.header,
        { borderBottomColor: Colors[colorScheme === 'dark' ? 'light' : 'dark'].background }
      ]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={Colors[colorScheme].text} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme].text }]}>
          Comments
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* Comments List */}
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.commentsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Comment Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={[
          styles.inputContainer,
          { borderTopColor: Colors[colorScheme === 'dark' ? 'light' : 'dark'].background }
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { 
              color: Colors[colorScheme].text,
              backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0'
            }
          ]}
          placeholder="Add a comment..."
          placeholderTextColor="gray"
          value={newComment}
          onChangeText={setNewComment}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity 
          onPress={handleSubmitComment}
          disabled={!newComment.trim()}
          style={styles.sendButton}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={newComment.trim() ? Colors[colorScheme].tint : 'gray'} 
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    paddingLeft: 100,
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerRight: {
    width: 40,
  },
  commentsList: {
    padding: 16,
  },
  commentContainer: {
    marginBottom: 20,
  },
  commentText: {
    fontSize: 15,
    lineHeight: 20,
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
  },
  input: {
    flex: 1,
    marginRight: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 12,
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
    marginBottom: 12,
  }, 
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontWeight: '600',
    marginRight: 10,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
  profileImage: {
    height: 40, 
    width: 40, 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: "green", 
    marginRight: 10
  }
});