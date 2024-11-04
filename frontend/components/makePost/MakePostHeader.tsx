// components/makePost/MakePostHeader.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function MakePostHeader() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme || 'light'];
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: themeColors.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={themeColors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: themeColors.text }]}>New Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 15,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    paddingBottom: 13,
    fontWeight: 'bold',
  },
});
