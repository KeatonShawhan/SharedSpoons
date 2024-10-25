import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useProfile } from '@/contexts/profileContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import AchievementList from '@/components/profile/AchievementList';

type ProfileStackParamList = {
  ProfileMain: undefined;
  Followers: undefined;
  Following: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileTab: React.FC = () => {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileMain" screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileMainScreen} />
      <ProfileStack.Screen name="Followers" component={FollowersScreen} />
      <ProfileStack.Screen name="Following" component={FollowingScreen} />
    </ProfileStack.Navigator>
  );
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

const ProfileMainScreen: React.FC = () => {
  const { name } = useProfile();
  const [bio, setBio] = useState("Loading bio...");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [rank, setRank] = useState("Loading rank...");
  const [activeTab, setActiveTab] = useState<'posts' | 'achievements'>('posts');
  const [achievements, setAchievements] = useState([]);
  const colorScheme = useColorScheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setBio("Here is my dynamic bio loaded from a simulated fetch.");
      setFollowerCount(267000);
      setFollowingCount(348);
      setPostCount(143);
      setRank("Food Connoisseur");
      setAchievements([
        { rank: "New Foodie", progress: 25, required: 25, description: "Try your first 25 different dishes" },
        { rank: "Food Explorer", progress: 100, required: 100, description: "Discover 100 unique dishes" },
        { rank: "Taste Enthusiast", progress: 250, required: 250, description: "Experience 250 different dishes" },
        { rank: "Food Connoisseur", progress: 500, required: 500, description: "Savor 500 diverse dishes" },
        { rank: "Culinary Veteran", progress: 800, required: 1000, description: "Master 1000 different dishes" },
      ]);
    }, 2000);
  }, []);

  const renderPosts = () => (
    <View style={styles.postsContainer}>
      <Text style={[styles.emptyStateText, { color: Colors[colorScheme].text }]}>
        Posts coming soon...
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ProfileHeader name={name} bio={bio} rank={rank} colorScheme={colorScheme} />

        <ProfileStats 
          postCount={postCount}
          followerCount={followerCount}
          followingCount={followingCount}
          colorScheme={colorScheme}
          onFollowersPress={() => navigation.navigate('Followers')}
          onFollowingPress={() => navigation.navigate('Following')}
        />

        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('posts')}>
            <Ionicons 
              name="grid-outline" 
              size={24} 
              color={activeTab === 'posts' ? Colors[colorScheme].text : Colors[colorScheme].tabIconDefault} 
            />
            {activeTab === 'posts' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('achievements')}>
            <Ionicons 
              name="trophy-outline" 
              size={24} 
              color={activeTab === 'achievements' ? Colors[colorScheme].text : Colors[colorScheme].tabIconDefault} 
            />
            {activeTab === 'achievements' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>

        {activeTab === 'posts' ? renderPosts() : (
          <AchievementList achievements={achievements} colorScheme={colorScheme} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const FollowersScreen: React.FC = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Followers Screen</Text>
    </View>
  );
};

const FollowingScreen: React.FC = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Following Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  postsContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    marginTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 10,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 40, 
    height: 2, 
    backgroundColor: '#FF9F45', 
    borderRadius: 1,
    left: '50%',
    marginLeft: -20, 
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 18,
  },
});

export default ProfileTab;
