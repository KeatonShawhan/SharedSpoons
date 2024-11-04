import React from 'react';
import { TextInput, StyleSheet, useColorScheme } from 'react-native';

type RestaurantInputBoxProps = {
  restaurant: string;
  setRestaurant: (text: string) => void;
};

export function RestaurantInputBox({ restaurant, setRestaurant }: RestaurantInputBoxProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: isDarkMode ? '#333' : '#f9f9f9',
          color: isDarkMode ? '#fff' : '#000',
        },
      ]}
      placeholder="Restaurant Name"
      placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      value={restaurant}
      onChangeText={setRestaurant}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    minHeight: 40,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    fontSize: 16,
  },
});
