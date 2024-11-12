// app/pages/explore/explore.tsx

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import type { ExploreScreenNavigationProp } from '@/app/(tabs)/exploreMain';
import { ExploreSearchBar } from '@/components/explore/ExploreSearchbar';

// Define the Post interface here
interface Post {
  id: string;
  image: string;
  heightRatio?: number;
  // Add other fields if necessary
}

export default function Explore() {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts data when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Placeholder for API call to fetch posts
      // Replace with your actual API call
      const fetchedPosts: Post[] = [
        {
          id: '1',
          image: 'https://via.placeholder.com/300x400',
          heightRatio: 1.5,
          // Add other necessary fields
        },
        {
          id: '2',
          image: 'https://via.placeholder.com/300x500',
          heightRatio: 2,
        },
        // Add more posts as needed
      ];
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Calculate image width based on screen width and desired number of columns
  const numColumns = 2;
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth / numColumns - 16; // Adjust spacing as needed

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => navigation.navigate('Details', { postId: item.id })}
    >
      <Image
        source={{ uri: item.image }}
        style={[
          styles.image,
          {
            width: imageWidth,
            height: imageWidth * (item.heightRatio || 1.5),
          },
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Explore</Text>
      </View>
      <ExploreSearchBar/>
      {/* Staggered Grid */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
  },
  header: {
    height: 90, // Adjust as needed
    paddingTop: 0,
    paddingLeft: 20,
  },
  headerTitle: {
    paddingTop: 55,
    fontSize: 32,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 0,
    paddingTop: 15,
  },
  imageContainer: {
    flex: 1,
    margin: 8,
  },
  image: {
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
