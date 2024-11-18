// /Users/keaton/cse115a/SharedSpoons/frontend/app/pages/explore/MainScreen.tsx

import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import ProfileStats from '../../../components/profile/ProfileStats';
import ProfilePostSquare from '../../../components/profile/profilePostSquare';
import AchievementList from '../../../components/profile/AchievementList';
import SettingsTab from '@/components/profile/SettingsTab';
import type { ProfileStackParamList, ProfileScreenNavigationProp } from './profileNavigation';
import {
  fetchAllPosts,
  fetchUserInfo,
  fetchFollowerCount,
  fetchFollowingCount,
  checkIfFollowing,
  sendFollowRequest,
  removeFollowRequest,
} from './profileHelpers';
import LoginContext from '@/contexts/loginContext';

const { width } = Dimensions.get('window');

export default function MainScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<RouteProp<ProfileStackParamList, 'Main'>>();
  const loginContext = useContext(LoginContext);

  const profileId = route.params?.userId || loginContext.userId;
  const isOwnProfile = profileId === loginContext.userId;

  // Determine if we're in the profile tab or explore tab by checking the route
  // const isFromHomeTab = route.params?.isFromHomeTab ?? false;
  // const isFromExploreTab = route.params?.isFromExploreTab ?? false;
  const isFromProfileTab = route.params?.isFromProfileTab ?? false;
  // console.log(isFromExploreTab);

  // State variables
  const [userName, setUserName] = useState('Loading name...');
  const [bio, setBio] = useState('Loading bio...');
  const [rank, setRank] = useState('Loading rank...');
  const [activeTab, setActiveTab] = useState<'posts' | 'achievements' | 'settings'>('posts');
  const [achievements, setAchievements] = useState([]);
  const colorScheme = useColorScheme();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info
        const userData = await fetchUserInfo(profileId, loginContext.accessToken, loginContext.handleLogout);
        setUserName(`${userData.firstname} ${userData.lastname}`);
        setBio(userData.bio || 'No bio available');
        setRank(isOwnProfile ? 'Food Connoisseur' : 'Food Enthusiast');

        // Fetch followers and following data
        const followersData = await fetchFollowerCount(profileId, loginContext.accessToken, loginContext.handleLogout);
        setFollowerCount(followersData);

        const followingData = await fetchFollowingCount(profileId, loginContext.accessToken, loginContext.handleLogout);
        setFollowingCount(followingData);

        // Fetch all posts
        const allPostsData = await fetchAllPosts(profileId, loginContext.accessToken, loginContext.handleLogout);
        console.log(allPostsData);
        setPostCount(allPostsData.length);
        setPosts(allPostsData);

        // Check if current user is following the profile user
        if (!isOwnProfile) {
          const isFollowingStatus = await checkIfFollowing(
            loginContext.userId,
            profileId,
            loginContext.accessToken,
            loginContext.handleLogout
          );
          setIsFollowing(isFollowingStatus);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [profileId, loginContext.followed, loginContext.madePost]);

  useEffect(() => {
    // Simulate fetching achievements data
    setTimeout(() => {
      setAchievements([
        { rank: 'New Foodie', progress: 25, required: 25, description: 'Try your first 25 different dishes' },
        { rank: 'Food Explorer', progress: 100, required: 100, description: 'Discover 100 unique dishes' },
        { rank: 'Taste Enthusiast', progress: 250, required: 250, description: 'Experience 250 different dishes' },
        { rank: 'Food Connoisseur', progress: 500, required: 500, description: 'Savor 500 diverse dishes' },
        { rank: 'Culinary Veteran', progress: 800, required: 1000, description: 'Master 1000 different dishes' },
      ]);
    }, 2000);
  }, []);

  const handleFollowPress = async () => {
    if (isFollowing) {
      // Unfollow the user
      const success = await removeFollowRequest(profileId, loginContext.accessToken, loginContext.handleLogout);
      if (success) {
        setIsFollowing(false);
        setFollowerCount((prevCount) => prevCount - 1);
        loginContext.setFollowed(!loginContext.followed);
      }
    } else {
      // Follow the user
      const success = await sendFollowRequest(profileId, loginContext.accessToken, loginContext.handleLogout);
      if (success) {
        setIsFollowing(true);
        setFollowerCount((prevCount) => prevCount + 1);
        loginContext.setFollowed(!loginContext.followed);
      }
    }
  };

  const tabs = ['posts', 'achievements'];
  if (isOwnProfile) {
    tabs.push('settings');
  }

  const handleTabSwitch = (tab: 'posts' | 'achievements' | 'settings') => {
    const index = tabs.indexOf(tab);
    const toValue = index * width;
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      tension: 68,
      friction: 12,
    }).start();
    setActiveTab(tab);
  };

  const getIconColor = (isActive: boolean) => {
    return isActive
      ? colorScheme === 'dark'
        ? '#FFFFFF'
        : '#000000'
      : colorScheme === 'dark'
      ? '#666666'
      : '#999999';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]} edges={['top']}>
      <View style={styles.headerContainer}>
        <ProfileHeader
          name={userName}
          bio={bio}
          rank={rank}
          colorScheme={colorScheme}
          // Show back button if either not our profile OR not in profile tab
          showBackButton={!isFromProfileTab }
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          handleFollowPress={handleFollowPress}
        />
        <ProfileStats
          postCount={postCount}
          followerCount={followerCount}
          followingCount={followingCount}
          colorScheme={colorScheme}
          onFollowersPress={() =>
            navigation.push('Friends', { initialTab: 'followers', userId: profileId })
          }
          onFollowingPress={() =>
            navigation.push('Friends', { initialTab: 'following', userId: profileId })
          }
        />
        <View
          style={[
            styles.tabContainer,
            { borderBottomColor: colorScheme === 'dark' ? '#333333' : '#DDDDDD' },
          ]}
        >
          {tabs.map((tabName) => (
            <TouchableOpacity
              key={tabName}
              style={styles.tabButton}
              onPress={() => handleTabSwitch(tabName as 'posts' | 'achievements' | 'settings')}
            >
              <Ionicons
                name={
                  tabName === 'posts'
                    ? 'grid-outline'
                    : tabName === 'achievements'
                    ? 'trophy-outline'
                    : 'settings-outline'
                }
                size={24}
                color={getIconColor(activeTab === tabName)}
              />
              <View
                style={[
                  styles.activeIndicator,
                  { opacity: activeTab === tabName ? 1 : 0 },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Animated.View
        style={[
          styles.contentContainer,
          { width: width * tabs.length },
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: tabs.map((_, i) => i * width),
                  outputRange: tabs.map((_, i) => -i * width),
                }),
              },
            ],
          },
        ]}
      >
        {tabs.map((tabName) => (
          <View key={tabName} style={styles.tabContent}>
            {tabName === 'posts' && (
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
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={styles.postsRow}
                style={styles.flatList}
              />
            )}
            {tabName === 'achievements' && (
              <AchievementList achievements={achievements} colorScheme={colorScheme} />
            )}
            {tabName === 'settings' && (
              <SettingsTab userName={userName} bio={bio} colorScheme={colorScheme} />
            )}
          </View>
        ))}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 0 },
  headerContainer: { paddingHorizontal: 10 },
  contentContainer: { flex: 1, flexDirection: 'row' },
  tabContent: { width: width },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 7,
    paddingTop: 5,
    paddingBottom: 15,
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
  },
  tabButton: { flex: 1, alignItems: 'center', position: 'relative', paddingVertical: 10 },
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
  flatList: { flex: 1, width: '100%' },
  listContainer: { paddingBottom: 80 },
  postsRow: { paddingHorizontal: 9, marginTop: 8, justifyContent: 'flex-start' },
  settingsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 16,
  },
});
