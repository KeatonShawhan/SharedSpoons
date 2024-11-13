import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import API_URL from '../../config'
import LoginContext from "@/contexts/loginContext";

export const ExploreSearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<{ id: string; username: string }[]>([]);
  const loginContext = useContext(LoginContext);
  const currentUsername = loginContext.userName;
  // const navigation = useNavigation();

  const searchSuggestion = async (input: string) => {
    try {
      const response = await fetch(
        `${API_URL}/explore/search/suggestion?input=${encodeURIComponent(input)}&currentUsername=${encodeURIComponent(currentUsername)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginContext.accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      setSuggestions(result);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch suggestions based on the search input
  useEffect(() => {
    if (searchInput) {
      searchSuggestion(searchInput);
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  const handleSearch = (selectedInput: string) => {
    setSearchInput(selectedInput);
    // navigation.navigate('SearchResults', { query: selectedInput });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for usernames"
        value={searchInput}
        onChangeText={setSearchInput}
        onSubmitEditing={() => handleSearch(searchInput)}
        autoCapitalize="none"
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSearch(item.username)} style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>{item.username}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
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
    borderColor: Colors.light.icon,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  suggestionsList: {
    backgroundColor: '#fff',
    maxHeight: 200,
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
  },
});