import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface ProfileHeaderProps {
  name: string;
  bio: string;
  rank: string;
  colorScheme: string;
  showBackButton?: boolean; // Optional prop to show the back arrow
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, bio, rank, colorScheme, showBackButton }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerSection, { backgroundColor: Colors[colorScheme].background }]}>
      {/* Conditionally render the back button */}
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>
      )}
      <View style={styles.nameSection}>
        {/* Conditionally apply padding to only the rank section */}
        <View style={[styles.rankContainer, showBackButton && { marginLeft: 40 }]}>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 20,
    zIndex: 1,
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
  name: {
    fontSize: width * 0.08,
    fontWeight: '700',
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
  },
  bio: {
    fontSize: width * 0.038,
    lineHeight: width * 0.05,
    marginBottom: 0.1,
  },
});

export default ProfileHeader;
