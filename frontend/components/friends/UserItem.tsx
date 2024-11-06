// UserItem.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const ORANGE_COLOR = '#FF9F45';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
}

interface UserItemProps {
  user: User;
  colorScheme: string;
  onPress: (userId: string) => void;
}

export const UserItem: React.FC<UserItemProps> = ({ 
  user, 
  colorScheme, 
  onPress, 
}) => (
  <TouchableOpacity 
    style={styles.userItem} 
    onPress={() => onPress(user.id)}
  >
    <View style={styles.userInfo}>
      {/* Display full name */}
      <Text style={[styles.userFullName, { color: Colors[colorScheme].text }]}>
        {`${user.firstname} ${user.lastname}`}
      </Text>
      {/* Display username */}
      <Text style={[styles.userHandle, { color: Colors[colorScheme].text }]}>
        {user.username}
      </Text>
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
  },
  userInfo: {
    flex: 1,
  },
  userFullName: {
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

export default UserItem;
