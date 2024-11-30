import React, { useContext, useRef, useState, useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostCard } from '@/components/postCard/postCard';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/home/Header';
import { Colors } from '@/constants/Colors';
import LoginContext from '@/contexts/loginContext';
import { fetchPosts } from './homeHelpers';
import LoadingIndicator from '../LoadingIndicator';
import { useNavigation } from "expo-router";
import { RootTabParamList } from '../../(tabs)/_layout';
import { StackNavigationProp } from "@react-navigation/stack";

const HEADER_HEIGHT = 80;
const SCROLL_THRESHOLD = 50;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const loginContext = useContext(LoginContext)!;
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>();
  const [homePosts, setHomePosts] = useState([]);
  const [lastPostTime, setLastPostTime] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const scrollYRef = useRef(new Animated.Value(0)).current;
  const [isResetting, setIsResetting] = useState(false);

  const resetPostsState = () => {
    console.log('Resetting posts state');
    setHomePosts([]);
    setLastPostTime(undefined);
    setIsResetting(true);
  };

  const getPosts = async (reset = false) => {
    if (!loginContext.isInitialized || !loginContext.accessToken) {
      console.log('Not initialized or no access token, skipping fetch');
      return;
    }

    if (loading && !reset) {
      console.log('Already loading, skipping fetch');
      return;
    }

    setLoading(true);
    console.log('Fetching posts. Reset:', reset, 'Last post time:', lastPostTime);

    try {
      if (reset) {
        resetPostsState();
      }

      const posts = await fetchPosts(
        loginContext.userId,
        loginContext.accessToken,
        loginContext.handleLogout,
        10,
        reset ? undefined : lastPostTime
      );

      if (posts && posts.length > 0) {
        setHomePosts((prevPosts) => [...(reset ? [] : prevPosts), ...posts]);
        setLastPostTime(posts[posts.length - 1].data.time);
        console.log('Successfully loaded posts. Count:', posts.length);
      } else {
        console.log('No posts returned from fetch');
      }
    } catch (error) {
      console.error('Error in getPosts:', error);
    } finally {
      setLoading(false);
      setIsResetting(false);
    }
  };

  // Handle user session changes
  useEffect(() => {
    if (!loginContext.isInitialized) return;

    const hasUserChanged = loginContext.userId !== loginContext.lastUser;
    const isNewSession = loginContext.userId && !loginContext.lastUser;
    
    console.log('User session check:', {
      currentUser: loginContext.userId,
      lastUser: loginContext.lastUser,
      hasUserChanged,
      isNewSession,
      isAuthenticated: loginContext.isAuthenticated
    });

    if (hasUserChanged || isNewSession) {
      console.log('User changed or new session detected, resetting posts');
      getPosts(true);
    }
  }, [
    loginContext.userId,
    loginContext.lastUser,
    loginContext.isInitialized,
    loginContext.isAuthenticated
  ]);

  // Handle follow status changes
  useEffect(() => {
    if (!loginContext.isInitialized) return;
    console.log('Follow status changed, refreshing posts');
    getPosts(true);
  }, [loginContext.followed]);

  // Update saved post status
  useEffect(() => {
    if (!loginContext.savedPostData) return;

    const { postId, isSaved } = loginContext.savedPostData;
    console.log("Updating saved status for post:", postId, "to", isSaved);
    
    setHomePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, data: { ...post.data, is_saved: isSaved } } : post
      )
    );
  }, [loginContext.savedPostData]);

  const headerTranslateY = scrollYRef.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollYRef.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollYRef } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isResetting) return;

        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;

        if (contentHeight - scrollOffset <= layoutHeight + 20 && !loading) {
          getPosts();
        }
      },
    }
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyMessage, { color: Colors[colorScheme].text }]}>
        You&apos;re not following anyone yet!
      </Text>
      <Text style={[styles.emptySubMessage, { color: Colors[colorScheme].text }]}>
        Search for friends and users on the Explore page to see their posts here.
      </Text>
      <TouchableOpacity
        style={[styles.exploreButton, { backgroundColor: Colors.light.primaryColor }]}
        onPress={() => navigation.navigate('exploreMain')}
      >
        <Text style={styles.exploreButtonText}>Go to Explore</Text>
      </TouchableOpacity>
    </View>
  );

  if (!loginContext.isInitialized) {
    return <LoadingIndicator message="Loading your data..." />;
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Animated.View
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: headerTranslateY }],
            opacity: headerOpacity,
          },
        ]}
      >
        <Header colorScheme={colorScheme} />
      </Animated.View>

      {homePosts.length === 0 && !loading ? (
        renderEmptyState()
      ) : (
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {homePosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              isSaved={post.data.is_saved}
              isLiked={post.data.is_liked}
              user_id={post.user}
              username={post.data.username}
              caption={post.data.caption}
              dish={post.data.dish}
              rating={post.data.rating}
              place={post.data.restaurant}
              image={post.data.image}
              parentTab="HomeTab"
              pfp={post.data.pfp}
              isOwnProfile={false}
              isReposted={post.data.is_reposted}
              repostedBy={post.data.reposted_by}
            />
          ))}

          {loading && <LoadingIndicator message="Loading more posts..." />}
        </Animated.ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  exploreButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  exploreButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
