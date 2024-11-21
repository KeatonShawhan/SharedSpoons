//HomeScreen.tsx
import React, { useContext, useRef, useState, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostCard } from '@/components/postCard/postCard';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/home/Header';
import { Colors } from '@/constants/Colors';
import LoginContext from '@/contexts/loginContext';
import { fetchPosts } from './homeHelpers';
const HEADER_HEIGHT = 80; 
const SCROLL_THRESHOLD = 50;
import LoadingIndicator from '../LoadingIndicator';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const loginContext = useContext(LoginContext)!;
  const [homePosts, setHomePosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      // Wait until the context is fully initialized
      if (!loginContext.isInitialized) return;

      // Ensure the accessToken is set correctly before making the fetch call
      if (!loginContext.accessToken) {
        console.log('No access token available.');
        return;
      }

      const posts = await fetchPosts(
        loginContext.userId,
        loginContext.accessToken,
        loginContext.handleLogout
      );

      setHomePosts(posts || []);
    };

    getPosts();
  }, [
    loginContext.isInitialized,
    loginContext.followed,
    loginContext.addedEat,
    loginContext.isAuthenticated,
  ]);
  
  // Use a ref to track the scroll position
  const scrollYRef = useRef(new Animated.Value(0)).current;

  // Set up header animations based on scrollY
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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYRef } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {homePosts.map(post => (
          <PostCard 
            key={post.id}  
            id={post.id}
            isSaved={post.is_saved}
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