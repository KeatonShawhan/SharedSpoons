import React from 'react';
import { View, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';

export const MakePostButton = ({ color, focused }) => {
  return (
    <View style={focused ? styles.focusedContainer : styles.container}>
      <AntDesign name="plussquare" size={28} color={'grey'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, // Adjust the position to float over the tab bar
  },
  focusedContainer: {
    width: 35,
    height: 35,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  }
});
