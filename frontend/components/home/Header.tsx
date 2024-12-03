import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// Removed FontAwesome import since it's no longer needed for the logo
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import LoginContext from '@/contexts/loginContext';

// Import your custom logo image
/* eslint-disable */
const LogoImage = require('../../assets/images/SpoonsLogo.png'); // Adjust the path if necessary
/* eslint-enable */

const ORANGE_COLOR = '#FF9F45';

interface HeaderProps {
  colorScheme: string;
}

export const Header: React.FC<HeaderProps> = ({ colorScheme }) => {
  const loginContext = useContext(LoginContext);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        {/* App Logo */}
        <Image
          source={LogoImage}
          style={[styles.logo, { tintColor: Colors[colorScheme].text }]} // Apply tintColor if your logo is monochromatic
          accessibilityLabel="Shared Spoons Logo" // Accessibility label for screen readers
        />
        {/* App Name */}
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
          SharedSpoons
        </Text>
        {/* Logout Button */}
        <TouchableOpacity onPress={loginContext.handleLogout} style={styles.logoutButton}>
          <Ionicons 
            name="log-out-outline" 
            size={28}
            color={Colors[colorScheme].text} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 60,
    backgroundColor: '#fff', // Optional: Set a background color if needed
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    justifyContent: 'flex-start', // Align items to the start
  },
  logo: {
    width: 40, // Adjust based on your logo image dimensions
    height: 40, // Adjust based on your logo image dimensions
    resizeMode: 'contain', // Ensures the image scales correctly
    marginRight: 10, // Space between logo and title
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    flex: 1, // Allows the title to take up available space
  },
  logoutButton: {
    paddingLeft: 10, // Space between title and logout icon
  },
  divider: {
    height: 2,
    backgroundColor: ORANGE_COLOR,
    marginHorizontal: 20,
  },
});
