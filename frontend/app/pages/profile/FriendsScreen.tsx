import React, { useContext, useState, useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
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
import type { ProfileStackParamList, ProfileScreenNavigationProp } from './profileNavigation';
import { fetchFollowersInfo, fetchFollowingInfo, fetchUserInfo } from './profileHelpers'; // Import fetchUserInfo
import LoginContext from '@/contexts/loginContext';

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
  const loginContext = useContext(LoginContext);

  const profileId = route.params?.userId || loginContext.userId;
  const isOwnProfile = profileId === loginContext.userId;

  const [activeTab, setActiveTab] = useState(route.params.initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [suggested_users] = useState(SUGGESTED_USERS);
  const [firstName, setFirstName] = useState(loginContext.firstName); // Default to logged-in user

  // Fetch followers and following when the page opens
  useEffect(() => {
    const fetchData = async () => {
      if (!isOwnProfile) {
        // Fetch first name of the user if viewing someone else's profile
        const userInfo = await fetchUserInfo(profileId, loginContext.accessToken);
        setFirstName(userInfo.firstname || "User");
      } else {
        console.log(loginContext.firstName);
        setFirstName(loginContext.firstName);
      }

      // Fetch followers and following data
      const followersData = await fetchFollowersInfo(profileId, loginContext.accessToken);
      setFollowers(followersData);

      const followingData = await fetchFollowingInfo(profileId, loginContext.accessToken);
      setFollowing(followingData);
    };

    fetchData();
  }, [profileId]); // Re-fetch data when profileId changes

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.header}>
        <Header 
          onBack={() => navigation.goBack()} 
          colorScheme={colorScheme}
          firstName={firstName} // Pass correct firstName
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
            data={activeTab === "followers" ? followers : following}
            renderItem={({ item }) => (
            <UserItem
              user={item}
              colorScheme={colorScheme}
              onPress={(userId) => {
                if (userId === loginContext.userId) {
                  // Reset the navigation stack to only have the Main screen for the logged-in user
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Main', params: { userId: loginContext.userId } }],
                    })
                  );
                } else {
                  // Otherwise, push a new instance of MainScreen for the selected user
                  navigation.push('Main', { userId });
                }
              }}
            />
            )}
            keyExtractor={(item) => item.id}
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

// Style definitions remain the same
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, height: 180 },
  contentContainer: { flex: 1 },
  userListContainer: { height: 300 },
  listContent: { position: 'absolute', top: -10, left: 16, right: 16, height: 1 },
  topDivider: { position: 'absolute', top: -20, left: 16, right: 16, height: 1, backgroundColor: 'rgba(128, 128, 128, 0.2)', zIndex: 1 },
  suggestedSection: { flex: 1 },
});
