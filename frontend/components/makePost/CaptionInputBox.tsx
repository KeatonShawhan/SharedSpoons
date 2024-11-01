// components/CaptionInputBox.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type CaptionInputBoxProps = {
  caption: string;
  setCaption: (text: string) => void;
};

export function CaptionInputBox({ caption, setCaption }: CaptionInputBoxProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Write a caption..."
      value={caption}
      onChangeText={setCaption}
      multiline
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    minHeight: 60,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    fontSize: 16,
    textAlignVertical: 'top', // Ensures text starts at the top on Android
  },
});
