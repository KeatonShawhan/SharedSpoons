import React, { useContext, useRef, useState, useEffect } from 'react';
import { Animated, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostCard } from '@/components/postCard/postCard';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/home/Header';
import { Colors } from '@/constants/Colors';
import LoginContext from '@/contexts/loginContext';
import { fetchPosts } from './homeHelpers';
import LoadingIndicator from '../LoadingIndicator';

const HEADER_HEIGHT = 80;
const SCROLL_THRESHOLD = 50;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const loginContext = useContext(LoginContext)!;
  const [homePosts, setHomePosts] = useState([]);
  const [lastPostTime, setLastPostTime] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const scrollYRef = useRef(new Animated.Value(0)).current;

  const getPosts = async () => {
    if (!loginContext.isInitialized || !loginContext.accessToken) return;
    setLoading(true);

    const posts = await fetchPosts(
      loginContext.userId,
      loginContext.accessToken,
      loginContext.handleLogout,
      10,
      lastPostTime
    );

    if (posts && posts.length > 0) {
      setHomePosts((prevPosts) => [...prevPosts, ...posts]);
      setLastPostTime(posts[posts.length - 1].data.time);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, [
    loginContext.isInitialized,
    loginContext.accessToken,
    loginContext.isAuthenticated,
    loginContext.followed,
    loginContext.addedEat,
  ]);

  const headerTranslateY = scrollYRef.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollYRef.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollYRef } } }],
    { 
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;
        
        // check if near the bottom for infinite scroll
        if (contentHeight - scrollOffset <= layoutHeight + 20 && !loading) {
          getPosts();
        }
      }
    }
  );

  if (!loginContext.isInitialized) {
    return <LoadingIndicator message="Loading your data..." />;
  }

  return (
    <SafeAreaView 
      edges={['top']}
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background }
      ]}
    >
      <Animated.View 
        style={[
          styles.headerContainer,
          { 
            transform: [{ translateY: headerTranslateY }],
            opacity: headerOpacity,
          }
        ]}
      >
        <Header colorScheme={colorScheme} />
      </Animated.View>

      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {homePosts.map(post => (
          <PostCard 
            key={post.id}  
            id={post.id}
            isSaved={post.data.is_saved}
            user_id={post.user}
            username={post.data.username}
            caption={post.data.caption}
            dish={post.data.dish}
            rating={post.data.rating}
            place={post.data.restaurant}
            image={post.data.image}
            parentTab="HomeTab"
            pfp={post.data.pfp}
          />
        ))}
        
        {loading && <LoadingIndicator message="Loading more posts..." />}
      </Animated.ScrollView>
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
});