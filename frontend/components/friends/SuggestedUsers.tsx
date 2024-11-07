import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

const ORANGE_COLOR = '#FF9F45';
const SQUARE_SIZE = 70;
const SQUARE_MARGIN = 15;

interface SuggestedUser {
  id: string;
  name: string;
  username: string;
}

interface SuggestedUsersProps {
  users: SuggestedUser[];
  colorScheme: string;
  onUserPress: (user: SuggestedUser) => void;
}

export const SuggestedUsers: React.FC<SuggestedUsersProps> = ({ 
  users, 
  colorScheme,
  onUserPress 
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      snapToInterval={SQUARE_SIZE + SQUARE_MARGIN * 2} // Snap to each card
      decelerationRate="fast"
    >
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          style={styles.userCard}
          onPress={() => onUserPress(user)}
        >
          <View style={styles.profileSquare} />
          <Text style={[styles.name, { color: Colors[colorScheme].text }]}>
            {user.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  userCard: {
    width: SQUARE_SIZE,
    alignItems: 'center',
    marginHorizontal: SQUARE_MARGIN,
  },
  profileSquare: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: ORANGE_COLOR,
    opacity: 0.8,
    borderRadius: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});