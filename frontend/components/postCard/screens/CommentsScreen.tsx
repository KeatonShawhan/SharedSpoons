// components/post/screens/CommentsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { CommentsScreenNavigationProp, CommentsScreenRouteProp } from '../postNavigator';

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export function CommentsScreen() {
  const navigation = useNavigation<CommentsScreenNavigationProp>();
  const route = useRoute<CommentsScreenRouteProp>();
  const colorScheme = useColorScheme();
  const { postId, parentTab } = route.params; // Access params from the route
  const [newComment, setNewComment] = useState('');
  
  // Dummy comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'johndoe',
      text: 'Looks delicious! 😋',
      timestamp: '2h ago'
    },
    {
      id: '2',
      username: 'foodlover',
      text: 'I need to try this place!',
      timestamp: '1h ago'
    }
  ]);

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: 'currentUser', // Replace with actual username from context/props
        text: newComment,
        timestamp: 'Just now'
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={[styles.username, { color: Colors[colorScheme].text }]}>
          {item.username}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={[styles.commentText, { color: Colors[colorScheme].text }]}>
        {item.text}
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
    marginBottom: 5,
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
    marginBottom: 5,
  },
});
