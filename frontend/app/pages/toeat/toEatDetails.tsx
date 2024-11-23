// app/pages/toEatDetails.tsx
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ToEatDetailsInfo } from '@/components/toEatCard/toEatDetails';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import type { ToEatStackParamList } from '@/app/(tabs)/toeat';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PostStackParamList } from '@/app/navigation/PostStackNavigator';
import { ProfileStackParamList } from '@/app/pages/profile/profileNavigation';
import type { PostCardProps } from '@/components/postCard/postCard';
import LoginContext from '@/contexts/loginContext';
import { fetchPostData } from './toEatHelper';

type ToEatDetailsRouteProp = RouteProp<{ ToEatDetails: { id: string } }, 'ToEatDetails'>;

// Update navigation prop to include ProfileStackParamList
type ToEatDetailsNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ToEatStackParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<PostStackParamList>,
    NativeStackNavigationProp<ProfileStackParamList>
  >
>;

export default function ToEatDetails() {
  const route = useRoute<ToEatDetailsRouteProp>();
  const navigation = useNavigation<ToEatDetailsNavigationProp>();
  const colorScheme = useColorScheme();
  const { id } = route.params;
  const loginContext = useContext(LoginContext);
  const [post, setPost] = useState<PostCardProps>();

  const themeColors = Colors[colorScheme];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPostData(id, loginContext.accessToken);
        // console.log(postData);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  // Add handler for profile navigation
  const handleProfileNavigation = (userId: string) => {
    navigation.navigate('ProfileRoot', {
      screen: 'Main',
      params: {
        userId,
        isFromProfileTab: false,
        isFromHomeTab: false,
        isFromExploreTab: false
      }
    });
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: themeColors.icon }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Details</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ThemedView style={{ paddingTop: 20 }}>
          <ToEatDetailsInfo 
            {...post}
            onProfilePress={post?.user_id ? () => handleProfileNavigation(post.user_id) : undefined}
          />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerRight: {
    width: 40, // For balance with back button
  },
});