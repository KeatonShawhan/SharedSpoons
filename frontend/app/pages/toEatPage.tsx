import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { toEatCard } from '@/components/toEatCard/toEatCard';
import { useNavigation } from '@react-navigation/native';

export default function ToEatList() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <SafeAreaView>
        <ThemedView style={{ paddingTop: 0 }}>
          <Text style={{ padding: 20, fontWeight: 'bold', fontSize: 36 }}>
            To-Eat
          </Text>
          {toEatCard({
            dish: "Pepperoni Pizza",
            place: "Pizza Hut",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU",
            id: "83c689b1-b7a7-4100-8b2d-309908b444f5",
            navigation
          })}
          {toEatCard({
            dish: "Italian Sandwich #13 with no ham add roast beef",
            place: "Jersey Mike's",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvmjamuCycuEPL9U1rse906oY1Ga-8uv0vw&s",
            id: "12c689b1-b7a7-4100-8b2d-309908b444f5",
            navigation
          })}
        </ThemedView>
      </SafeAreaView>
    </ScrollView>
  );
}