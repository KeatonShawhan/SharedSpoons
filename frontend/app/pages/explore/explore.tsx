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
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl, // Import RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ExploreScreenNavigationProp } from '@/app/(tabs)/exploreMain';
import { ExploreSearchBar } from '@/components/explore/ExploreSearchbar';
import LoginContext from '@/contexts/loginContext';
import { fetchExplorePosts } from '@/app/pages/explore/exploreHelpers';
import ExplorePostSquare from '@/components/explore/ExplorePostSquare';
import { Feather } from '@expo/vector-icons'; // Import Feather icons

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

  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchBarOpacity = useRef(new Animated.Value(0)).current; // Initialize opacity to 0

  const loginContext = useContext(LoginContext);

  // New state for search input
  const [searchInput, setSearchInput] = useState('');

  // New state for refreshing
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch posts with optional refresh parameter
  const fetchPosts = async (isRefresh = false) => {
    if (!loginContext?.accessToken) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    try {
      if (isRefresh) {
        setRefreshing(true);
        setOffset(0); // Reset offset for refresh
      } else {
        setLoading(true);
      }
      setError(null);

      const fetchedPosts = await fetchExplorePosts(
        loginContext.handleLogout,
        loginContext.accessToken,
        36,
        isRefresh ? 0 : offset * 36
      );

      if (!Array.isArray(fetchedPosts)) {
        throw new Error('Invalid posts data');
      }

      if (fetchedPosts.length === 0) {
        return;
      }

      const mappedPosts = fetchedPosts.map((post) => ({
        id: post.id,
        image: post.data.image,
        heightRatio: Math.random() * 0.5 + 1.0,
      }));

      setPosts((prevPosts) => {
        if (isRefresh) {
          // Replace posts on refresh
          return mappedPosts;
        } else {
          // Append posts for infinite scroll
          const allPosts = [...prevPosts, ...mappedPosts];
          const uniquePosts = allPosts.filter(
            (post, index, self) => index === self.findIndex((p) => p.id === post.id)
          );
          return uniquePosts;
        }
      });

      if (isRefresh) {
        setOffset(1); // Reset offset after refresh
      } else {
        setOffset((prevOffset) => prevOffset + 1);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts');
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPosts(); // Initial fetch without refreshing
  }, []);

  // Function to split posts into columns for masonry layout
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

  // Function to render each column of posts
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

  // Handle scroll event for infinite scrolling
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollYRef } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;

        if (contentHeight - scrollOffset <= layoutHeight + 50 && !loading && !isSearchActive) {
          fetchPosts();
        }
      },
    }
  );

  // Functions to open and close the search bar with fade-in/fade-out effect
  const openSearchBar = () => {
    setIsSearchActive(true);
    Animated.timing(searchBarOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSearchBar = () => {
    Animated.timing(searchBarOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsSearchActive(false);
      setSearchInput(''); // Clear search input when closing
    });
  };

  const toggleSearchBar = () => {
    if (isSearchActive) {
      closeSearchBar();
    } else {
      openSearchBar();
    }
  };

  // Handle the pull-to-refresh action
  const onRefresh = () => {
    fetchPosts(true); // Pass 'true' to indicate a refresh action
  };

  // Render loading indicator if posts are loading and none are displayed yet
  if (loading && posts.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={themeColors.tint} />
      </View>
    );
  }

  // Render error message if there was an error fetching posts and none are displayed yet
  if (error && posts.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: themeColors.text }}>{error}</Text>
      </View>
    );
  }

  // Main render function
  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header with title and search icon */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Explore</Text>
        <TouchableOpacity style={styles.searchIconContainer} onPress={toggleSearchBar}>
          <View style={styles.searchIconCircle}>
            {/* Use Feather icon for the search icon */}
            <Feather name="search" size={30} color={'#FF9F45'} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Divider line */}
      <View style={[styles.divider, { backgroundColor: Colors[colorScheme].icon}]} />

      {/* Blur background and touchable overlay when search bar is active */}
      {isSearchActive && (
        <>
          {/* Blur Background */}
          <BlurView intensity={40} tint="dark" style={[StyleSheet.absoluteFill, { zIndex: 10 }]} />
          {/* Touchable Overlay */}
          <TouchableWithoutFeedback onPress={closeSearchBar}>
            <View style={[StyleSheet.absoluteFill, { zIndex: 11 }]} pointerEvents="box-only" />
          </TouchableWithoutFeedback>
        </>
      )}

      {/* Animated Search Bar with fade-in/fade-out effect */}
      <Animated.View
        style={[
          styles.animatedSearchBar,
          {
            opacity: searchBarOpacity,
            backgroundColor: themeColors.background,
            borderColor: themeColors.icon,
            height: searchInput.length > 0 ? null : 50, // Adjust height based on input
            paddingBottom: searchInput.length > 0 ? 10 : 0, // Adjust padding if needed
            zIndex: 12, // Ensure it's above the overlay
          },
        ]}
        pointerEvents={isSearchActive ? 'auto' : 'none'}
      >
        <ExploreSearchBar navigation={navigation} onSearchInputChange={setSearchInput} />
      </Animated.View>

      {/* Posts Section */}
      <View style={{ flex: 1, zIndex: isSearchActive ? -1 : 0 }}>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[themeColors.tint]} // For Android
              tintColor={themeColors.tint} // For iOS
              title="Refreshing..."
              titleColor={themeColors.text}
            />
          }
        >
          <View style={styles.columnsContainer}>
            <View style={styles.column}>{renderColumn(leftColumn)}</View>
            <View style={styles.column}>{renderColumn(middleColumn)}</View>
            <View style={styles.column}>{renderColumn(rightColumn)}</View>
          </View>
          {loading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="small"
              color={themeColors.tint}
            />
          )}
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  header: {
    height: 90,
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    paddingBottom: 5,
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 1,
  },
  searchIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: themeColors.tint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedSearchBar: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10, // Adjust to fill the width between left and right
    borderRadius: 15,
    paddingHorizontal: 10,
    overflow: 'hidden', // Ensure content doesn't overflow when height is adjusted
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
  divider: {
    height: 1,
    marginTop: 16,
    marginBottom: 10,
  },
});
