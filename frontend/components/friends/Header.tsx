import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

const ORANGE_COLOR = '#FF9F45';

interface HeaderProps {
  onBack: () => void;
  colorScheme: string;
}

export const Header: React.FC<HeaderProps> = ({ onBack, colorScheme }) => (
  <View style={styles.titleContainer}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <Ionicons name="arrow-back" size={32} color={Colors[colorScheme].text} />
    </TouchableOpacity>
    
    <View style={styles.rectangleRight} />
    <View style={styles.rectangleBottom} />
    
    <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
      Friends
    </Text>
  </View>
);

const styles = StyleSheet.create({
  titleContainer: {
    position: 'absolute',
    right: 30,
    top: 20,
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    left: -205,
    top: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'right',
    marginBottom: 5,
  },
  rectangleRight: {
    position: 'absolute',
    right: -2,
    top: 0,
    width: 2.3,
    height: '140%',
    backgroundColor: ORANGE_COLOR,
  },
  rectangleBottom: {
    position: 'absolute',
    right: -2,
    bottom: 2,
    width: '115%',
    height: 2,
    backgroundColor: ORANGE_COLOR,
  },
});