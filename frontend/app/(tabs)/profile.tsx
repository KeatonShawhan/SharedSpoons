import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useProfile } from '../../contexts/profileContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const ProfileTab: React.FC = () => {
  const { name } = useProfile();
  const [bio, setBio] = useState("Loading bio...");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setBio("Here is my dynamic bio loaded from a simulated fetch.");
      setFollowerCount(267000);
      setFollowingCount(348);
      setPostCount(143);
    }, 2000); // simulate a fetch delay
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: 'https://via.placeholder.com/150' }}
                />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.bio}>{bio}</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={styles.statAmount}>{followerCount.toLocaleString()}</Text>
                        <Text style={styles.statTitle}>Followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={styles.statAmount}>{followingCount}</Text>
                        <Text style={styles.statTitle}>Following</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={styles.statAmount}>{postCount}</Text>
                        <Text style={styles.statTitle}>Posts</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    paddingTop: '8%',
    paddingBottom: '4%',
    backgroundColor: Colors.light.secondaryColor,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.primaryColor,
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    borderWidth: 3,
    borderColor: Colors.light.secondaryColor,
    marginBottom: '2%',
  },
  name: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: Colors.light.primaryColor,
    marginBottom: '3%', // Added margin for spacing
    fontFamily: 'Inter_400Regular',
  },
  bio: {
    fontSize: width * 0.035,
    color: Colors.light.text,
    fontWeight: '300',
    marginBottom: '4%', // Increased for better spacing
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Keeps items evenly spaced, but we will reduce the space
    width: '100%', // Full width
    paddingBottom: '2%', // Padding at the bottom
    paddingHorizontal: '8%', // Reduce horizontal padding if necessary
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10, // Adjust this value to reduce the space between the stats
  },
  statAmount: {
    fontSize: width * 0.045,
    color: Colors.light.text,
    fontWeight: '600',
  },
  statTitle: {
    fontSize: width * 0.03,
    color: Colors.light.icon,
    fontWeight: 'bold',
  },
});

export default ProfileTab;
