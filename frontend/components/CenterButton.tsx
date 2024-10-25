// CenterButton.js
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Customize as needed
import { Colors } from '@/constants/Colors';

export default function CenterButton() {
  return (
      <View style={styles.button}>
        <Icon name="add" size={24} color="#fff" /> 
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});