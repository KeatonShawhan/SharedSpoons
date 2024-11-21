// app/pages/explore/postDetails.tsx

import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import LoginContext from '@/contexts/loginContext';
import { RouteProp, useNavigation } from '@react-navigation/native';
import API_URL from '@/config';
import { ExploreScreenStackParamList } from '@/app/(tabs)/exploreMain';
import { PostCard, PostCardProps } from '@/components/postCard/postCard';

type PostDetailsRouteProp = RouteProp<ExploreScreenStackParamList, 'Details'>;

type Props = {
  route: PostDetailsRouteProp;
};

export default function PostDetails({ route }: Props) {
  const { postId } = route.params;
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const loginContext = useContext(LoginContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postData, setPostData] = useState<PostCardProps | null>(null);

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  const fetchPostData = async () => {
    if (!loginContext?.accessToken) {
      setError('User not logged in');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Debugging: Log the token and postId
      console.log(`Fetching post with ID: ${postId} and token: ${loginContext.accessToken}`);

      const response = await fetch(`${API_URL}post/postID/${postId}`, {
        headers: {
          Authorization: `Bearer ${loginContext.accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          loginContext.handleLogout();
        }
        throw new Error('Failed to fetch post');
      }

      const apiData = await response.json();

      if (!apiData || !apiData.data) {
        throw new Error('Invalid post data');
      }

      // Transform API data to match PostCard props
      const transformedData: PostCardProps = {
        id: apiData.id || '',
        user_id: apiData.user || '',
        username: apiData.data.username || 'User',
        caption: apiData.data.caption || '',
        dish: apiData.data.dish || '',
        rating: apiData.data.rating || 0,
        place: apiData.data.restaurant || '',
        image: apiData.data.image || '',
        pfp: apiData.data.pfp,
        likes: apiData.likes || 0, // Add if your API provides these
        commentsCount: apiData.commentsCount || 0, // Add if your API provides these
        parentTab: 'ExploreTab', // Since we're in the explore tab
      };

      setPostData(transformedData);
    /* eslint-disable */
    } catch (err: any) {
    /* eslint-enable */
      console.error('Error fetching post:', err);
      if (err.message.includes("401")) {
        loginContext.handleLogout();
        return;
      }
      setError(err instanceof Error ? err.message : 'Failed to fetch post');
      setPostData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = getStyles(Colors[colorScheme]);

  // Header component with back arrow
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: Colors.light.text }]}>Post Details</Text>
      <View style={styles.placeholder} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
        </View>
      </View>
    );
  }

  if (error || !postData) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Text style={[styles.errorText, { color: Colors[colorScheme].text }]}>
            {error || 'Failed to load post'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.postCardContainer}>
          <PostCard {...postData} />
        </View>
      </View>
    </View>
  );
}

const getStyles = (colors: { [key: string]: string }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 120, // Increased height
      paddingHorizontal: 10, // Reduced padding
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background,
      paddingTop: 50, // Added padding to lower the header
    },
    backButton: {
      paddingRight: 16,
    },
    headerTitle: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    placeholder: {
      width: 40,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 15,
    },
    postCardContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 50,
    },
  });
