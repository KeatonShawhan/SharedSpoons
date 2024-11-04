import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface ProfileHeaderProps {
  name: string;
  bio: string;
  rank: string;
  colorScheme: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, bio, rank, colorScheme }) => {
  return (
    <View style={[styles.headerSection, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.nameSection}>
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
        <Text style={[styles.name, { color: Colors[colorScheme].text }]}>{name}</Text>
        <Text style={[styles.bio, { color: Colors[colorScheme].text }]}>{bio}</Text>
      </View>
      <Image
        style={[styles.profileImage, { borderColor: Colors[colorScheme].icon }]}
        source={{ uri: 'https://via.placeholder.com/150' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  nameSection: {
    flex: 1,
    marginRight: 20,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
  },
  name: {
    fontSize: width * 0.08,
    fontWeight: '700',
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
  },
  rankContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#FF9F45',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 4,
  },
  rankText: {
    color: '#000000',
    fontSize: width * 0.035,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bio: {
    fontSize: width * 0.038,
    lineHeight: width * 0.05,
    marginBottom: .1,
  },
});

export default ProfileHeader;