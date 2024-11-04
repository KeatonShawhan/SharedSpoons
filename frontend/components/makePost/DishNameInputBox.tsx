import React from 'react';
import { TextInput, StyleSheet, useColorScheme } from 'react-native';

type DishNameInputBoxProps = {
  dishName: string;
  setDishName: (text: string) => void;
};

export function DishNameInputBox({ dishName, setDishName }: DishNameInputBoxProps) {
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
      placeholder="Dish Name"
      placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      value={dishName}
      onChangeText={setDishName}
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
