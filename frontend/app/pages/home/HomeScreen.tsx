import React, { useContext, useRef, useState, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostCard } from '@/components/postCard/postCard';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Header } from '@/components/home/Header';
import { Colors } from '@/constants/Colors';
import type { HomeScreenNavigationProp } from '@/app/(tabs)';
import LoginContext, { LoginProvider } from '@/contexts/loginContext';
import { fetchPosts } from './homeHelpers';
const HEADER_HEIGHT = 80; 
const SCROLL_THRESHOLD = 50; 

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const loginContext = useContext(LoginContext)!
  const [homePosts, setHomePosts] = useState([])
  console.log(loginContext.accessToken);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await fetchPosts(loginContext.userId, loginContext.accessToken);
      setHomePosts(posts);
      console.log(homePosts);
    };

    getPosts();
  }, []);

  
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
            user_id={post.user_id}
            username={post.firstname + " " + post.lastname}
            caption={post.data.caption}
            dish={post.data.dish}
            rating={post.data.rating}
            place={post.data.restaurant}
            image={post.data.image}
            parentTab="HomeTab" 
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