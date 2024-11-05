import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '@/contexts/profileContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import ProfileStats from '../../../components/profile/ProfileStats';
import ProfilePostSquare from '../../../components/profile/profilePostSquare';
import AchievementList from '../../../components/profile/AchievementList';
import { ProfileScreenNavigationProp } from '@/app/(tabs)/profile';

const { width } = Dimensions.get('window');

export default function MainScreen() {
  const { 
    name,
    followerCount,
    followingCount,
    posts,
    isLoadingPosts,
    refreshProfile
  } = useProfile();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  // Keep rank in local state
  const [rank, setRank] = useState("Loading rank...");
  const [bio, setBio] = useState("Loading bio...");
  const [activeTab, setActiveTab] = useState<'posts' | 'achievements'>('posts');
  const [achievements, setAchievements] = useState([]);
  const colorScheme = useColorScheme();
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial fetch of profile data
    refreshProfile();
    setBio("This is my test bio.");
    // Set fake rank
    setRank("Food Connoisseur");
    
    // Simulate fetching achievements data
    setTimeout(() => {
      setAchievements([
        { rank: "New Foodie", progress: 25, required: 25, description: "Try your first 25 different dishes" },
        { rank: "Food Explorer", progress: 100, required: 100, description: "Discover 100 unique dishes" },
        { rank: "Taste Enthusiast", progress: 250, required: 250, description: "Experience 250 different dishes" },
        { rank: "Food Connoisseur", progress: 500, required: 500, description: "Savor 500 diverse dishes" },
        { rank: "Culinary Veteran", progress: 800, required: 1000, description: "Master 1000 different dishes" },
      ]);
    }, 2000);
  }, []);

  const handleTabSwitch = (tab: 'posts' | 'achievements') => {
    const toValue = tab === 'posts' ? 0 : width;
    
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      tension: 68,
      friction: 12
    }).start();
    
    setActiveTab(tab);
  };

  const getIconColor = (isActive: boolean) => {
    if (isActive) {
      return colorScheme === 'dark' ? '#FFFFFF' : '#000000';
    }
    return colorScheme === 'dark' ? '#666666' : '#999999';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]} edges={['top']}>
      <View style={styles.headerContainer}>
        <ProfileHeader name={name} bio={bio} rank={rank} colorScheme={colorScheme} />
        <ProfileStats 
        postCount={posts.length}
        followerCount={followerCount}
        followingCount={followingCount}
        colorScheme={colorScheme}
        onFollowersPress={() => navigation.navigate('Friends', { initialTab: 'followers' })}
        onFollowingPress={() => navigation.navigate('Friends', { initialTab: 'following' })}
        />
        <View style={[
          styles.tabContainer, 
          { borderBottomColor: colorScheme === 'dark' ? '#333333' : '#DDDDDD' }
        ]}>
          <TouchableOpacity 
            style={styles.tabButton} 
            onPress={() => handleTabSwitch('posts')}
          >
            <Ionicons 
              name="grid-outline" 
              size={24} 
              color={getIconColor(activeTab === 'posts')} 
            />
            <View style={[
              styles.activeIndicator,
              { opacity: activeTab === 'posts' ? 1 : 0 }
            ]} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tabButton} 
            onPress={() => handleTabSwitch('achievements')}
          >
            <Ionicons 
              name="trophy-outline" 
              size={24} 
              color={getIconColor(activeTab === 'achievements')} 
            />
            <View style={[
              styles.activeIndicator,
              { opacity: activeTab === 'achievements' ? 1 : 0 }
            ]} />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={[
        styles.contentContainer,
        {
          transform: [{
            translateX: slideAnim.interpolate({
              inputRange: [0, width],
              outputRange: [0, -width]
            })
          }]
        }
      ]}>
        <View style={styles.tabContent}>
        <FlatList
          key="posts"
          data={posts}
          numColumns={3}
          renderItem={({ item }) => (
          <ProfilePostSquare
            imageUrl={item.data.image}
            onPress={() => navigation.navigate('PostPage', { postId: item.id })}
          />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.postsRow}
          style={styles.flatList}
          refreshing={isLoadingPosts}
          onRefresh={refreshProfile}
        />
        </View>
        <View style={styles.tabContent}>
          <AchievementList 
            achievements={achievements} 
            colorScheme={colorScheme} 
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
  },
  headerContainer: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    width: width * 2,
  },
  tabContent: {
    width: width,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 7,
    paddingTop: 5,
    paddingBottom: 15,
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 10,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -0.1,
    width: 40,
    height: 2,
    backgroundColor: '#FF9F45',
    borderRadius: 1,
    left: '50%',
    marginLeft: -20,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  listContainer: {
    paddingBottom: 80,
  },
  postsRow: {
    paddingHorizontal: 9,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
});