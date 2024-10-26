import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const ORANGE_COLOR = '#FF9F45';

interface User {
  id: string;
  name: string;
  username: string;
}

interface UserItemProps {
  user: User;
  colorScheme: string;
  onPress: (user: User) => void;
}

export const UserItem: React.FC<UserItemProps> = ({ user, colorScheme, onPress }) => (
  <TouchableOpacity style={styles.userItem} onPress={() => onPress(user)}>
    <View style={styles.userInfo}>
      <Text style={[styles.userName, { color: Colors[colorScheme].text }]}>
        {user.name}
      </Text>
      <Text style={styles.userHandle}>{user.username}</Text>
    </View>
    <View style={styles.circleProfile} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userHandle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  circleProfile: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: ORANGE_COLOR,
    opacity: 0.8,
    marginLeft: 10,
  },
});