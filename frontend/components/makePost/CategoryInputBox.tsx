// components/makePost/CategoryInputBox.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type CategoryInputBoxProps = {
  category: string;
  setCategory: (text: string) => void;
};

export function CategoryInputBox({ category, setCategory }: CategoryInputBoxProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Category (e.g., Italian, Fast Food)"
      value={category}
      onChangeText={setCategory}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    minHeight: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    fontSize: 16,
  },
});
