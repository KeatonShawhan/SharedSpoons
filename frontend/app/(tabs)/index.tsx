import { Image, StyleSheet, Platform, SafeAreaView, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { postCard } from '@/components/postCard/postCard';
export default function HomeScreen() {
  return (
    <ScrollView>
      <SafeAreaView>
        <ThemedView style={{paddingTop: 20}}>
          {postCard({
            username:"Zoe Feller",
            caption: "yum!",
            dish:"pepperoni pizza",
            rating: 4.5,
            place: "Pizza Hut",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU"

          })}

          {postCard({
            username:"Keaton Shawhan",
            caption: "had e coli :/",
            dish:"big mac",
            rating: 1,
            place: "McDonalds",
            image: "https://i2-prod.walesonline.co.uk/incoming/article22961099.ece/ALTERNATES/s615b/0_EGR_020222_ChickenBigMac_05.jpg"

          })}

          {postCard({
            username:"Luca Schram",
            caption: ":p",
            dish:"Italian Sandwich #13",
            rating: 4,
            place: "Jersey Mikes",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvmjamuCycuEPL9U1rse906oY1Ga-8uv0vw&s"

          })}
         

        </ThemedView>
      </SafeAreaView>
    </ScrollView>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">SharedSpoons</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView>
    //     {postCard({title: 'title'})}
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
    //       Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{' '}
    //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
