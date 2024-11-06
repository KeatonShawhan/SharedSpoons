import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Header } from 'components/friends/Header';
import { SearchBar } from 'components/friends/SearchBar';
import { Tabs } from 'components/friends/Tabs';
import { UserItem } from 'components/friends/UserItem';
import { SuggestedHeader } from 'components/friends/SuggestedHeader';
import { SuggestedUsers } from 'components/friends/SuggestedUsers';
import type { ProfileStackParamList, ProfileScreenNavigationProp } from '@/app/(tabs)/profile';
import { fetchAllPosts, fetchFollowersInfo, fetchFollowingInfo } from './profileHelpers';
import LoginContext from '@/contexts/loginContext';

const DUMMY_USERS = [
  { id: '1', name: 'John Doe', username: '@johndoe' },
  { id: '2', name: 'Jane Smith', username: '@janesmith' },
  { id: '3', name: 'Mike Johnson', username: '@mikej' },
  { id: '4', name: 'Sarah Wilson', username: '@sarahw' },
  { id: '5', name: 'Alex Brown', username: '@alexb' },
];

const SUGGESTED_USERS = [
  { id: 's1', name: 'Emily Davis', username: '@emilyd' },
  { id: 's2', name: 'Tom Wilson', username: '@tomw' },
  { id: 's3', name: 'Lisa Anderson', username: '@lisaa' },
  { id: 's4', name: 'Mark Thompson', username: '@markt' },
  { id: 's5', name: 'Amy Chen', username: '@amyc' },
];

type FriendsScreenRouteProp = RouteProp<ProfileStackParamList, 'Friends'>;

export default function FriendsScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<FriendsScreenRouteProp>();
  const [activeTab, setActiveTab] = useState(route.params.initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState(DUMMY_USERS);
  const [suggested_users] = useState(SUGGESTED_USERS);

  const loginContext = useContext(LoginContext)
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)


  // get followers and following when u open the page
  useEffect(() => {
    const getFollowers = async () => {
      const followersData = await fetchFollowersInfo(loginContext.userId, loginContext.accessToken);
      setFollowerCount(followersData.length);
      setFollowers(followersData);
    };

    const getFollowing = async () => {
      const followingData = await fetchFollowingInfo(loginContext.userId, loginContext.accessToken);
      setFollowingCount(followingData.length);
      setFollowing(followingData)
    };

    getFollowing();
    getFollowers();
  }, []);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.header}>
        <Header 
          onBack={() => navigation.goBack()} 
          colorScheme={colorScheme}
        />
        
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={`Search ${activeTab}...`}
          colorScheme={colorScheme}
        />
        
        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          colorScheme={colorScheme}
        />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.userListContainer}>
          <View style={styles.topDivider} />
          <FlatList
            data={activeTab == "followers" ? followers : following}
            renderItem={({ item }) => (
              <UserItem
                user={item}
                colorScheme={colorScheme}
                onPress={() => navigation.navigate('Main')}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        </View>
        
        <View style={styles.suggestedSection}>
          <SuggestedHeader colorScheme={colorScheme} />
          <SuggestedUsers 
            users={suggested_users}
            colorScheme={colorScheme}
            onUserPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    height: 180,
  },
  contentContainer: {
    flex: 1,
  },
  userListContainer: {
    height: 300,
  },
  listContent: {
    position: 'absolute',
    top: -10,
    left: 16,
    right: 16,
    height: 1,
  },
  topDivider: {
    position: 'absolute',
    top: -20,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    zIndex: 1,
  },
  suggestedSection: {
    flex: 1,
  },
});