import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface ProfileStatsProps {
  postCount: number;
  followerCount: number;
  followingCount: number;
  colorScheme: string;
  onFollowersPress: () => void;
  onFollowingPress: () => void;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ 
  postCount, 
  followerCount, 
  followingCount, 
  colorScheme,
  onFollowersPress,
  onFollowingPress 
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 10000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  };

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsBox}>
        <Text style={[styles.statAmount, { color: Colors[colorScheme].text }]}>
          {formatNumber(postCount)}
        </Text>
        <Text style={[styles.statTitle, { color: Colors[colorScheme].tabIconDefault }]}>Posts</Text>
      </View>
      <TouchableOpacity style={styles.statsBox} onPress={onFollowersPress}>
        <Text style={[styles.statAmount, { color: Colors[colorScheme].text }]}>
          {formatNumber(followerCount)}
        </Text>
        <Text style={[styles.statTitle, { color: Colors[colorScheme].tabIconDefault }]}>Followers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.statsBox} onPress={onFollowingPress}>
        <Text style={[styles.statAmount, { color: Colors[colorScheme].text }]}>
          {formatNumber(followingCount)}
        </Text>
        <Text style={[styles.statTitle, { color: Colors[colorScheme].tabIconDefault }]}>Following</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  statsBox: {
    alignItems: 'center',
  },
  statAmount: {
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  statTitle: {
    fontSize: width * 0.035,
    marginTop: 4,
  },
});

export default ProfileStats;
