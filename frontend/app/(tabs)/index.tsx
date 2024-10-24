import {SafeAreaView, ScrollView } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { postCard } from '@/components/postCard/postCard';
export default function HomeScreen() {
  return (
    <ScrollView>
      <SafeAreaView>
        <ThemedView style={{paddingTop: 20}}>
          {postCard({
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

          {postCard({
            id: "81c689b1-b7a7-4100-8b2d-309908b444f5",
            username:"Keaton Shawhan",
            caption: "had e coli :/",
            dish:"big mac",
            rating: 1,
            place: "McDonalds",
            image: "https://i2-prod.walesonline.co.uk/incoming/article22961099.ece/ALTERNATES/s615b/0_EGR_020222_ChickenBigMac_05.jpg",
            categories: ["Fast Food", "American"],
            notes: "terrible awful disgusting. dont eat here. my burger looked nasty."

          })}

          {postCard({
            id: "83c689b1-b7a7-4100-8b2d-309908b444f5",
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