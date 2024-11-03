// ProfilePostHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface ProfilePostHeaderProps {
  onBackPress: () => void;
}

const ORANGE_COLOR = '#FF9F45';

const ProfilePostHeader: React.FC<ProfilePostHeaderProps> = ({ onBackPress }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.button}>
        <Ionicons name="arrow-back" size={24} color={themeColors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: themeColors.text }]}>Post Details</Text>
      <View style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    paddingHorizontal: 10,
    paddingTop: 70,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: ORANGE_COLOR, 
  },
  button: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default ProfilePostHeader;
