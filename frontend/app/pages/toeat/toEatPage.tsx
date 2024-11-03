// app/pages/toEatPage.tsx
import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { toEatCard } from '@/components/toEatCard/toEatCard';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { ToEatScreenNavigationProp } from '@/app/(tabs)/toeat';

export default function ToEatPage() {
  const navigation = useNavigation<ToEatScreenNavigationProp>();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={[styles.header, { borderBottomColor: Colors[colorScheme].icon }]}>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme].text }]}>To-Eat</Text>
      </View>

      <ScrollView>
        <ThemedView style={styles.contentContainer}>
          {toEatCard({
            dish: "Pepperoni Pizza",
            place: "Pizza Hut",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU",
            id: "83c689b1-b7a7-4100-8b2d-309908b444f5",
            onPress: () => navigation.navigate('ToEatDetails', { id: "83c689b1-b7a7-4100-8b2d-309908b444f5" }),
          })}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    marginBottom: 10,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  contentContainer: {
    paddingTop: 10,
  },
});
