import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { toEatCard } from '@/components/toEatCard/toEatCard';
import { useNavigation } from '@react-navigation/native';
import { ToEatDetailsInfo } from '@/components/toEatCard/toEatDetails';
export default function ToEatDetails() {
  // query happens here!!
  
  return (
    <ScrollView>
      <SafeAreaView>
        <ThemedView style={{ paddingTop: 0 }}>
          {ToEatDetailsInfo({
            id: "83c689b1-b7a7-4100-8b2d-309908b444f5",
            username:"Zoe Feller",
            caption: "yum!",
            dish:"pepperoni pizza",
            rating: 4.5,
            place: "Pizza Hut",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU",
            categories: ["Pizza", "Italian"],
            notes: "i thought it was really good, maybe a little greasy "
          })}
        </ThemedView>
      </SafeAreaView>
    </ScrollView>
  );
}