// This is the entire file content for ProfilePostHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ProfilePostHeaderProps {
  onBackPress: () => void;
}

const ProfilePostHeader: React.FC<ProfilePostHeaderProps> = ({ onBackPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.button}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Post Details</Text>
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
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  button: {
    marginRight: 20,
  },
  title: {
    fontSize: 20,
  }
});

export default ProfilePostHeader;
