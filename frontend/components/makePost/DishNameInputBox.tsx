// components/makePost/DishNameInputBox.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type DishNameInputBoxProps = {
  dishName: string;
  setDishName: (text: string) => void;
};

export function DishNameInputBox({ dishName, setDishName }: DishNameInputBoxProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Dish Name"
      value={dishName}
      onChangeText={setDishName}
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
