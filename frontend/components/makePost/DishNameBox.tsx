// components/makePost/CaptionInputBox.tsx

import React from 'react';
import { TextInput, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

const ORANGE_COLOR = '#FF9F45';

type DishNameBoxProps = {
  dishName: string;
  setDishName: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function DishNameBox({ dishName, setDishName, onFocus, onBlur }: DishNameBoxProps) {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme || 'light'];

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: ORANGE_COLOR,
          backgroundColor: themeColors.background,
          color: themeColors.text,
        },
      ]}
      placeholder="Enter Dish Name"
      placeholderTextColor={themeColors.icon} 
      value={dishName}
      onChangeText={setDishName}
      multiline
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    minHeight: 60,
    borderWidth: 2,
    borderRadius: 25,
    padding: 20,
    marginBottom: 120,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
