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
import type { ProfileStackParamList, ProfileScreenNavigationProp } from './navigationTypes';
import { fetchFollowersInfo, fetchFollowingInfo, fetchUserInfo } from './profileHelpers'; 
import LoginContext from '@/contexts/loginContext';

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
  const [firstName, setFirstName] = useState(loginContext.firstName);

  useEffect(() => {
    const fetchData = async () => {
      if (!isOwnProfile) {
        const userInfo = await fetchUserInfo(profileId, loginContext.accessToken, loginContext.handleLogout);
        setFirstName(userInfo.firstname || "User");
      } else {
        setFirstName(loginContext.firstName);
      }

      const followersData = await fetchFollowersInfo(profileId, loginContext.accessToken, loginContext.handleLogout);
      setFollowers(followersData);

      const followingData = await fetchFollowingInfo(profileId, loginContext.accessToken, loginContext.handleLogout);
      setFollowing(followingData);
    };

    fetchData();
  }, [profileId]);

  const filteredData = (activeTab === 'followers' ? followers : following).filter((user) =>
  (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
   user.username?.toLowerCase().includes(searchQuery.toLowerCase()))
);

  const listData = [
    ...(filteredData.map((user) => ({ type: 'user', data: user })) || []),
  ];

  const renderItem = ({ item }: { item }) => {
    if (item.type === 'user') {
      return (
        <UserItem
          user={item.data}
          colorScheme={colorScheme}
          onPress={(userId) => {
            if (userId === loginContext.userId) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Main', params: { userId: loginContext.userId } }],
                })
              );
            } else {
              navigation.push('Main', { userId });
            }
          }}
        />
      );
    } else if (item.type === 'suggested_header') {
      return <SuggestedHeader colorScheme={colorScheme} />;
    } else if (item.type === 'suggested_user') {
      return (
        <SuggestedUsers
          users={item.data}
          colorScheme={colorScheme}
          onUserPress={() => {}}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.header}>
        <Header onBack={() => navigation.goBack()} colorScheme={colorScheme} firstName={firstName} />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={`Search ${activeTab}...`}
          colorScheme={colorScheme}
        />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} colorScheme={colorScheme} />
      </View>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.type + index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, height: 150 },
  listContent: { padding: 16 },
});
