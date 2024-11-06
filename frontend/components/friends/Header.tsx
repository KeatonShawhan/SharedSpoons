import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import LoginContext from '@/contexts/loginContext';

const ORANGE_COLOR = '#FF9F45';

interface HeaderProps {
  onBack: () => void;
  colorScheme: string;
}

export const Header: React.FC<HeaderProps> = ({ onBack, colorScheme }) => {
  const loginContext = useContext(LoginContext)
  const firstName = loginContext.userName.split(' ')[0];

  return (
    <View style={styles.titleContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={32} color={Colors[colorScheme].text} />
      </TouchableOpacity>
      
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
        {`${firstName}'s Friends`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    position: 'absolute',
    right: 20,
    top: 10,
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    left: -115, // Fixed padding from left edge
    top: 12,
    zIndex: 1, // Ensure button stays above title if they overlap
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'right',
    marginBottom: 5,
  },
});