import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { toEatCard } from '@/components/toEatCard/toEatCard';
import { Children } from 'react';

export default function HomeScreen() {
  return (
    <ScrollView>
      <SafeAreaView>
        <ThemedView style={{paddingTop: 0}}>
          
          <Text style={{padding: 20, fontWeight:'bold', fontSize:36}}>
            To-Eat
          </Text>
          {toEatCard({
            username:"Zoe Feller",
            caption: "yum!",
            dish:"pepperoni pizza",
            rating: 4.5,
            place: "Pizza Hut",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU",
            categories: ["Pizza", "Italian"],
            notes: "i thought it was really good, maybe a little greasy "
          })}
          {toEatCard({
            username:"Luca Schram",
            caption: ":p",
            dish:"Italian Sandwich #13 with no ham add roast beef",
            rating: 4,
            place: "Jersey Mikes",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvmjamuCycuEPL9U1rse906oY1Ga-8uv0vw&s",
            categories: ["Lunch", "Deli", "Fast Food"],
            notes: "I love the rosemary parm bread its my favorite. I usually get it mikes waay with no tomatoes and honey mustard on the side"
          })}


        </ThemedView>
      </SafeAreaView>
    </ScrollView>
  );
}