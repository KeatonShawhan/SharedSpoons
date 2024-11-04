import React from 'react';
import { TextInput, StyleSheet, useColorScheme } from 'react-native';

type CategoryInputBoxProps = {
  category: string;
  setCategory: (text: string) => void;
};

export function CategoryInputBox({ category, setCategory }: CategoryInputBoxProps) {
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
      placeholder="Category (e.g., Italian, Fast Food)"
      placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      value={category}
      onChangeText={setCategory}
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
