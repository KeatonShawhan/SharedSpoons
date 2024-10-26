import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Header } from 'components/friends/Header';
import { SearchBar } from 'components/friends/SearchBar';
import { Tabs } from 'components/friends/Tabs';
import { UserItem } from 'components/friends/UserItem';
import type { ProfileStackParamList, ProfileScreenNavigationProp } from '@/app/(tabs)/profile';

const DUMMY_USERS = [
  { id: '1', name: 'John Doe', username: '@johndoe' },
  { id: '2', name: 'Jane Smith', username: '@janesmith' },
  { id: '3', name: 'Mike Johnson', username: '@mikej' },
  { id: '4', name: 'Sarah Wilson', username: '@sarahw' },
  { id: '5', name: 'Alex Brown', username: '@alexb' },
];

type FriendsScreenRouteProp = RouteProp<ProfileStackParamList, 'Friends'>;

export default function FriendsScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<FriendsScreenRouteProp>();
  const [activeTab, setActiveTab] = useState(route.params.initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState(DUMMY_USERS);

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
      
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            colorScheme={colorScheme}
            onPress={() => {}}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    paddingHorizontal: 16,
  },
});