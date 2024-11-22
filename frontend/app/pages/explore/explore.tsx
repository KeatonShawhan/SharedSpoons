import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ExploreScreenNavigationProp } from '@/app/(tabs)/exploreMain';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  const scrollYRef = useRef(new Animated.Value(0)).current;

  const loginContext = useContext(LoginContext);

  const fetchPosts = async () => {
    if (!loginContext?.accessToken) {
      setError('User not logged in');
      setLoading(false);
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
  
      const fetchedPosts = await fetchExplorePosts(
        loginContext.handleLogout,
        loginContext.accessToken,
        36,
        offset * 36
      );
      if (fetchedPosts.length === 0) {
        return;
      }
  
      if (!Array.isArray(fetchedPosts)) {
        throw new Error('Invalid posts data');
      }
  
      const mappedPosts = fetchedPosts.map((post) => ({
        id: post.id,
        image: post.data.image,
        heightRatio: Math.random() * 0.5 + 1.0,
      }));
  
      setPosts((prevPosts) => {
        // Combine new posts with existing ones, removing duplicates
        const allPosts = [...prevPosts, ...mappedPosts];
        const uniquePosts = allPosts.filter(
          (post, index, self) => index === self.findIndex((p) => p.id === post.id)
        );
        return uniquePosts;
      });
  
      setOffset((prevOffset) => prevOffset + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPosts();
  }, []);

  const splitPostsIntoColumns = (posts: Post[]) => {
    const leftColumn: Post[] = [];
    const middleColumn: Post[] = [];
    const rightColumn: Post[] = [];
    let leftHeight = 0;
    let middleHeight = 0;
    let rightHeight = 0;

    const IMAGE_WIDTH = (Dimensions.get('window').width - 32) / 3;

    posts.forEach((post) => {
      const imageHeight = IMAGE_WIDTH * (post.heightRatio || 1.0);
      if (leftHeight <= middleHeight && leftHeight <= rightHeight) {
        leftColumn.push(post);
        leftHeight += imageHeight;
      } else if (middleHeight <= leftHeight && middleHeight <= rightHeight) {
        middleColumn.push(post);
        middleHeight += imageHeight;
      } else {
        rightColumn.push(post);
        rightHeight += imageHeight;
      }
    });

    return { leftColumn, middleColumn, rightColumn };
  };

  const { leftColumn, middleColumn, rightColumn } = splitPostsIntoColumns(posts);

  const renderColumn = (column: Post[]) => {
    return column.map((post) => (
      <ExplorePostSquare
        key={post.id}
        imageUrl={post.image}
        onPress={() => navigation.navigate('Details', { postId: post.id })}
        heightRatio={post.heightRatio}
      />
    ));
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollYRef } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;

        if (contentHeight - scrollOffset <= layoutHeight + 50 && !loading) {
          fetchPosts();
        }
      },
    }
  );

  if (loading && posts.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={themeColors.tint} />
      </View>
    );
  }

  if (error && posts.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
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
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.columnsContainer}>
          <View style={styles.column}>{renderColumn(leftColumn)}</View>
          <View style={styles.column}>{renderColumn(middleColumn)}</View>
          <View style={styles.column}>{renderColumn(rightColumn)}</View>
        </View>
        {loading && <ActivityIndicator style={styles.loadingIndicator} size="small" color={themeColors.tint} />}
      </Animated.ScrollView>
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
  scrollContainer: {
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
});
