// components/makePost/NotesInputBox.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type NotesInputBoxProps = {
  notes: string;
  setNotes: (text: string) => void;
};

export function NotesInputBox({ notes, setNotes }: NotesInputBoxProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Notes about the dish"
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
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
