// app/pages/toEatDetails.tsx
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ToEatDetailsInfo } from '@/components/toEatCard/toEatDetails';
import { useRoute, useNavigation } from '@react-navigation/native';
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
  const { id } = route.params;

  const detailData: PostCardProps = {
    id,
    username: "Zoe Feller",
    caption: "yum!",
    dish: "Pepperoni Pizza",
    rating: 4.5,
    place: "Pizza Hut",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU",
    categories: ["Pizza", "Italian"],
    notes: "i thought it was really good, maybe a little greasy",
    likes: 15,
    commentsCount: 20,
    parentTab: 'ToEatTab', 
  };
  

  return (
    <ScrollView>
      <SafeAreaView>
        <ThemedView style={{ paddingTop: 20 }}>
          <ToEatDetailsInfo {...detailData} />
        </ThemedView>
      </SafeAreaView>
    </ScrollView>
  );
}