// app/pages/toEatDetails.tsx
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ToEatDetailsInfo } from '@/components/toEatCard/toEatDetails';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import type { ToEatScreenNavigationProp } from '@/app/(tabs)/toeat';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PostStackParamList } from '@/app/navigation/PostStackNavigator';
import type { PostCardProps } from '@/components/postCard/postCard';

type ToEatDetailsRouteProp = RouteProp<{ ToEatDetails: { id: string } }, 'ToEatDetails'>;
type ToEatDetailsNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<{ PostStack: PostStackParamList }>,
  ToEatScreenNavigationProp
>;

export default function ToEatDetails() {
  const route = useRoute<ToEatDetailsRouteProp>();
  const navigation = useNavigation<ToEatDetailsNavigationProp>();
  const colorScheme = useColorScheme();
  const { id } = route.params;

  const themeColors = Colors[colorScheme];

  const detailData: PostCardProps = {
    id,
    user_id:'1',
    username: "Zoe Feller",
    caption: "yum!",
    dish: "Pepperoni Pizza",
    rating: 4.5,
    place: "Pizza Hut",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU",
    parentTab: 'ToEatTab', 
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
          <ToEatDetailsInfo {...detailData} />
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
