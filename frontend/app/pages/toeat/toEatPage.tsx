// app/pages/toEatPage.tsx
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ToEatCard } from '@/components/toEatCard/toEatCard';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { fetchToEat } from './toEatHelper';
import type { ToEatScreenNavigationProp } from '@/app/(tabs)/toeat';
import LoginContext from '@/contexts/loginContext';

export default function ToEatPage() {
  const navigation = useNavigation<ToEatScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const loginContext = useContext(LoginContext)
  const [list, setList] = useState([]);


  useEffect(() => {
    console.log('herrrrreeeeee')
    const fetchData = async () => {
      try {
        const toEatList = await fetchToEat(loginContext.accessToken);
        setList(toEatList);
        console.log(toEatList.length)
      } catch (error) {
        console.error("Error fetching To-Eat data:", error);
      }
    };
    fetchData();
  }, [loginContext.addedEat]);
  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={[styles.header, { borderBottomColor: Colors[colorScheme].icon }]}>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme].text }]}>To-Eat</Text>
      </View>

      <ScrollView>
        <ThemedView style={styles.contentContainer}>
        {list && list.length > 0 ? (
          list.map((item) => (
            <ToEatCard
              key={item.id || Math.random().toString()}
              id={item.id}
              dish={item.data.dish || "Default Dish"}
              place={item.data.restaurant || "Default Place"}
              image={item.data.image}
              onPress={() => navigation.navigate('ToEatDetails', { id: item.id })}
            />
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No items to display</Text>
        )}
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
