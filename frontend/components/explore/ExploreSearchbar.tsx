import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import API_URL from '../../config';
import LoginContext from '@/contexts/loginContext';
import UserItem from '@/components/friends/UserItem';

interface Suggestion {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

interface ExploreSearchBarProps {
  /* eslint-disable */
  navigation: any;
  /* eslint-enable */
  onSearchInputChange: (input: string) => void; // Added callback prop
}

export const ExploreSearchBar: React.FC<ExploreSearchBarProps> = ({ navigation, onSearchInputChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const loginContext = useContext(LoginContext);
  const colorScheme = useColorScheme();

  // Fetch user suggestions from the backend
  const fetchSuggestions = async (input: string) => {
    try {
      const response = await fetch(
        `${API_URL}/explore/search/suggestion?input=${encodeURIComponent(input)}&currentUsername=${encodeURIComponent(
          loginContext.userName
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginContext.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();

      // Map and ensure all fields are available before setting suggestions
      /* eslint-disable */
      const mappedSuggestions = result.map((user: any) => ({
      /* eslint-enable */
        id: user.id,
        firstname: user.firstname || 'N/A', // Default value if undefined
        lastname: user.lastname || 'N/A', // Default value if undefined
        username: user.username,
      }));

      setSuggestions(mappedSuggestions);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  // Fetch suggestions whenever searchInput changes
  useEffect(() => {
    onSearchInputChange(searchInput); // Notify parent of the input change

    if (searchInput) {
      fetchSuggestions(searchInput);
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  return (
    <View style={styles.container}>
      {/* Search Input */}
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
        onChangeText={(text) => setSearchInput(text)}
        autoCapitalize="none"
      />
      {/* Search Suggestions */}
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
                  params: { userId, isFromExploreTab: true }, // Pass additional params
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
    marginTop: 0,
    width: '100%',
    alignSelf: 'center',
  },
  searchInput: {
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    maxHeight: 200,
    borderRadius: 15,
    marginTop: 5,
  },
});

export default ExploreSearchBar;
