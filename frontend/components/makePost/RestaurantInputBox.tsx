// components/makePost/RestaurantInputBox.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type RestaurantInputBoxProps = {
  restaurant: string;
  setRestaurant: (text: string) => void;
};

export function RestaurantInputBox({ restaurant, setRestaurant }: RestaurantInputBoxProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Restaurant Name"
      value={restaurant}
      onChangeText={setRestaurant}
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
