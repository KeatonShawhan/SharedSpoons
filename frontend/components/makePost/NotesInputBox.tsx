import React from 'react';
import { TextInput, StyleSheet, useColorScheme } from 'react-native';

type NotesInputBoxProps = {
  notes: string;
  setNotes: (text: string) => void;
};

export function NotesInputBox({ notes, setNotes }: NotesInputBoxProps) {
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
      placeholder="Notes about the dish"
      placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      value={notes}
      onChangeText={setNotes}
      multiline
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    minHeight: 80,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
