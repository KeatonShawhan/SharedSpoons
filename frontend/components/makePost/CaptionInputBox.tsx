// components/makePost/CaptionInputBox.tsx

import React from 'react';
import { TextInput, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

const ORANGE_COLOR = '#FF9F45';

type CaptionInputBoxProps = {
  caption: string;
  setCaption: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function CaptionInputBox({ caption, setCaption, onFocus, onBlur }: CaptionInputBoxProps) {
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
      placeholder="Write a caption..."
      placeholderTextColor={themeColors.icon} // Adjust for dark mode readability
      value={caption}
      onChangeText={setCaption}
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
