import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

interface HeaderProps {
  onBack: () => void;
  colorScheme: string;
  firstName: string;
}

export const Header: React.FC<HeaderProps> = ({ onBack, colorScheme, firstName }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButtonContainer}>
        <Ionicons name="arrow-back" size={28} color={Colors[colorScheme].text} />
      </TouchableOpacity>
      
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
        {`${firstName}'s Friends`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButtonContainer: {
    padding: 8, // Increase the clickable area
    borderRadius: 20, // Optional, for a circular touch area
    marginBottom: 30,
  },
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'right',
    paddingBottom: 30,
  },
});

export default Header;
