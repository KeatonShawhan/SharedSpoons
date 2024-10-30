import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface SuggestedHeaderProps {
  colorScheme: string;
}

export const SuggestedHeader: React.FC<SuggestedHeaderProps> = ({ colorScheme }) => (
  <View style={styles.container}>
    <View style={styles.divider} />
    <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
      Suggested
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  divider: {
    position: 'absolute',
    top: 5,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'left',
    marginLeft: 16,
  },
});