import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface ProfileHeaderProps {
  username: string;
  firstname: string;
  lastname: string;
  bio: string;
  rank: string;
  colorScheme: string;
  showBackButton?: boolean;
  isOwnProfile: boolean;
  isFollowing: boolean;
  location:string;
  handleFollowPress: () => void;
  pfp: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  firstname,
  location,
  lastname,
  bio,
  rank,
  colorScheme,
  showBackButton,
  isOwnProfile,
  isFollowing,
  handleFollowPress,
  pfp,
}) => {
  const navigation = useNavigation();

  // Determine font size based on username length
  const getDynamicFontSize = (text: string) => {
    if (text.length > 15) return width * 0.06; // Smaller font size for longer usernames
    if (text.length > 10) return width * 0.07; // Medium font size for mid-length usernames
    return width * 0.08; // Default font size
  };

  const usernameFontSize = getDynamicFontSize(username);

  return (
    <View style={[styles.headerSection, { backgroundColor: Colors[colorScheme].background }]}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>
      )}
      <View style={styles.nameSection}>
        <View style={[styles.rankContainer, showBackButton && { marginLeft: 40 }]}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
        {/* Username with dynamic font size */}
        <Text
          style={[styles.username, { fontSize: usernameFontSize, color: Colors[colorScheme].text }]}
        >
          {username}
        </Text>
        <Text style={[styles.name, { color: Colors[colorScheme].text }]}>{firstname + ' ' + lastname}</Text>
        <Text style={[styles.bio, { color: Colors[colorScheme].text }]}>{bio}</Text>
        <Text style={[styles.bio, { color: Colors[colorScheme].text }]}>{location}</Text>

      </View>
      <View style={styles.profileImageContainer}>
        <Image
          style={[styles.profileImage, { borderColor: Colors[colorScheme].text }]}
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          source={pfp ? { uri: pfp } : require('../../assets/images/default.jpeg')}
        />
        {!isOwnProfile && (
          <TouchableOpacity
            style={[styles.followButton, { backgroundColor: Colors[colorScheme].background }]}
            onPress={handleFollowPress}
          >
            <Ionicons
              name={isFollowing ? 'checkmark' : 'add'}
              size={16}
              color={Colors[colorScheme].text}
            />
          </TouchableOpacity>
        )}
      </View>
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
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    borderColor: 'black',
  },
  followButton: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -1, // Adjust this value to position the button partially over the profile image
    right: 3,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.icon,
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
  username: {
    fontWeight: '700',
    fontFamily: 'Inter_400Regular',
    marginBottom: 3,
    // textAlign: 'center', // Optional: to center-align username
  },
  bio: {
    fontSize: width * 0.038,
    lineHeight: width * 0.05,
    marginBottom: 0.1,
  },
  name: {
    fontSize: width * 0.04,
    lineHeight: width * 0.05,
    marginBottom: 2,
    fontWeight: '500',
  },
});

export default ProfileHeader;
