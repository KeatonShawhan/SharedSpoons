// app/pages/explore/explore.tsx

import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import type { ExploreScreenNavigationProp } from '@/app/(tabs)/exploreMain';
import { ExploreSearchBar } from '@/components/explore/ExploreSearchbar';
import LoginContext from '@/contexts/loginContext';
import { fetchExplorePosts } from '@/app/pages/explore/exploreHelpers';
import ExplorePostSquare from '@/components/explore/ExplorePostSquare';

interface Post {
  id: string;
  image: string;
  heightRatio?: number;
}

export default function Explore() {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loginContext = useContext(LoginContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (!loginContext?.accessToken) {
      setError('User not logged in');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const fetchedPosts = await fetchExplorePosts(
        loginContext.accessToken,
        loginContext.handleLogout
      );

      if (!Array.isArray(fetchedPosts)) {
        throw new Error('Invalid posts data');
      }

      const mappedPosts = fetchedPosts.map((post: any) => ({
        id: post.id,
        image: post.data.image, // Ensure this is a valid URL or base64 string
        heightRatio: Math.random() * 0.5 + 1.0, // Random heightRatio between 1.0 and 1.5
      }));

      setPosts(mappedPosts);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Post }) => (
    <ExplorePostSquare
      imageUrl={item.image}
      onPress={() => navigation.navigate('Details', { postId: item.id })}
      heightRatio={item.heightRatio}
    />
  );

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: themeColors.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <ActivityIndicator size="large" color={themeColors.tint} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: themeColors.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={{ color: themeColors.text }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Explore</Text>
      </View>
      <ExploreSearchBar navigation={navigation} />
      {/* Add spacing here */}
      <View style={styles.spacing} />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    height: 90,
    paddingTop: 50,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  spacing: {
    height: 20, // Adjust the height as needed for desired spacing
  },
  listContent: {
    paddingBottom: 90,
  },
});

