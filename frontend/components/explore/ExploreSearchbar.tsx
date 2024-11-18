// ExploreSearchbar.tsx

import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors'; // Import your Colors definition
import API_URL from '../../config';
import LoginContext from "@/contexts/loginContext";
import UserItem from '@/components/friends/UserItem';

interface Suggestion {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}
/* eslint-disable */
interface ExploreSearchBarProps {
  navigation: any;
}
/* eslint-enable */

export const ExploreSearchBar: React.FC<ExploreSearchBarProps> = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const loginContext = useContext(LoginContext);
  const colorScheme = useColorScheme();

  const fetchSuggestions = async (input: string) => {
    try {
      const response = await fetch(
        `${API_URL}/explore/search/suggestion?input=${encodeURIComponent(input)}&currentUsername=${encodeURIComponent(loginContext.userName)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginContext.accessToken}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(await response.text());
      }
  
      const result = await response.json();
      console.log(result);
      // console.log('Fetched suggestions:', result); // Log the response for debugging
  
      // Map and ensure all fields are available before setting suggestions
      /* eslint-disable */
      const mappedSuggestions = result.map((user: any) => ({
        id: user.id,
        firstname: user.firstname || 'N/A', // Default value if undefined
        lastname: user.lastname || 'N/A',   // Default value if undefined
        username: user.username,
      }));
      /* eslint-enable */
  
      setSuggestions(mappedSuggestions);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };
  

  useEffect(() => {
    if (searchInput) {
      fetchSuggestions(searchInput);
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.searchInput,
          {
            borderColor: Colors[colorScheme].icon,
            backgroundColor: Colors[colorScheme].background,
            color: Colors[colorScheme].text,
          },
        ]}
        placeholder="Search for usernames"
        placeholderTextColor={Colors[colorScheme].icon}
        value={searchInput}
        onChangeText={setSearchInput}
        autoCapitalize="none"
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserItem
              user={{
                id: item.id,
                firstname: item.firstname,
                lastname: item.lastname,
                username: item.username,
              }}
              colorScheme={colorScheme}
              onPress={(userId) => {
                navigation.push('ProfileRoot', { 
                  screen: 'Main', 
                  params: { userId, isFromExploreTab: true } // Set `isFromExploreTab` to true
                });
              }}
            />
          )}
          style={[
            styles.suggestionsList,
            { backgroundColor: Colors[colorScheme].background },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    maxHeight: 200,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default ExploreSearchBar;
