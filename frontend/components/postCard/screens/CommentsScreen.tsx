// components/post/screens/CommentsScreen.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { CommentsScreenNavigationProp } from '../postNavigator';
import { postComment, getComment } from './commentHelper';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import LoginContext from '@/contexts/loginContext';
import { Image } from 'react-native';
interface Comment {
  data: {
    id: string;
    username: string;
    text: string;
    time: string;
  }
  firstname: string;
  lastname:string;
  pfp: string;
}

type PostStackParamList = {
  Comments: { postId: string; parentTab: string };
};

type CommentsScreenRouteProp = RouteProp<PostStackParamList, 'Comments'>;


export function CommentsScreen() {
  const loginContext = useContext(LoginContext)
  const navigation = useNavigation<CommentsScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [newComment, setNewComment] = useState('');
  const options = {month: 'short', day:'numeric'}
  const route = useRoute<CommentsScreenRouteProp>(); 
  const { postId } = route.params; 
  
  const [comments, setComments] = useState([]);

  const handleSubmitComment = async () => {

    const success = await postComment(postId, newComment, loginContext.accessToken)
    const commentList = await getComment(postId, newComment, loginContext.accessToken)
    setComments(commentList)

    //console.log("ugh: " + success2);
  };

  const handleDate = (date: string) => {
    if (!date) return 'No date available';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return 'Invalid date';
    return Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(parsedDate);
  };

  useEffect( ()=>{
    const fetchData = async () => {
      const commentList = await getComment(postId, newComment, loginContext.accessToken)
      setComments(commentList)
      console.log(commentList[0])
    }

    fetchData();

  }, [])

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
      <Image 
            style={{height: 40, width:40, borderRadius:20, borderWidth:2, borderColor:"green", marginRight: 10}}
            source={{ uri: item.pfp }}
          />
        <Text style={[styles.username, { color: Colors[colorScheme].text }]}>
          {item.firstname + " " + item.lastname}
        </Text>
        <Text style={styles.timestamp}>{handleDate(item.data.time)}</Text>
      </View>
      <Text style={[styles.commentText, { color: Colors[colorScheme].text }]}>
        {item.data.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { backgroundColor: Colors[colorScheme].background }
      ]} 
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerRight: {
    width: 40, // For balance with back button
  },
  commentsList: {
    padding: 16,
  },
  commentContainer: {
    marginBottom: 20,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontWeight: '600',
  },
  commentText: {
    fontSize: 15,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
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
});
