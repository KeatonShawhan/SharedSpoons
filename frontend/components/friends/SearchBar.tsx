import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  colorScheme: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
  colorScheme,
}) => (
  <View style={styles.searchContainer}>
    <Ionicons 
      name="search-outline" 
      size={20} 
      color={Colors[colorScheme].text} 
      style={styles.searchIcon}
    />
    <TextInput
      style={[styles.searchInput, { color: Colors[colorScheme].text }]}
      placeholder={placeholder}
      placeholderTextColor={Colors[colorScheme].text}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    left: 16,
    top: 90,
    width: width * 0.5,
    height: 40,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
});