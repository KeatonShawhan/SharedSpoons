import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
import { MakePostScreenStackParamList } from '@/app/(tabs)/makePostMain';

type ToEatDetailsRouteProp = RouteProp<{ ToEatDetails: { id: string } }, 'ToEatDetails'>;

type ToEatDetailsNavigationProp = CompositeNavigationProp<
  CompositeNavigationProp<
    NativeStackNavigationProp<ToEatStackParamList>,
    NativeStackNavigationProp<MakePostScreenStackParamList>
  >,
  CompositeNavigationProp<
    NativeStackNavigationProp<PostStackParamList>,
    NativeStackNavigationProp<ProfileStackParamList>
  >
>;

export default function ToEatDetails() {
  const route = useRoute<ToEatDetailsRouteProp>();
  const navigation = useNavigation<ToEatDetailsNavigationProp>();
  const colorScheme = useColorScheme();
  const { id } = route.params || {}; // Default to empty object to avoid crashes
  const loginContext = useContext(LoginContext);
  const [post, setPost] = useState<PostCardProps>();
  const [isLoading, setIsLoading] = useState(true);

  const themeColors = Colors[colorScheme];

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Skip if id is undefined
      setIsLoading(true);

      try {
        const postData = await fetchPostData(id, loginContext.accessToken);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchData();
  }, [id]);


  if (isLoading) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: themeColors.background }]}>
        <ActivityIndicator size="large" color={themeColors.text} />
        <Text style={[styles.loadingText, { color: themeColors.text }]}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      <View style={[styles.header, { borderBottomColor: themeColors.icon }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ThemedView style={{ paddingTop: 20 }}>
          <ToEatDetailsInfo navigation={navigation}
            {...post}
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
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
