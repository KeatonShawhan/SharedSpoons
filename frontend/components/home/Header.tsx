import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import LoginContext from '@/contexts/loginContext';

const ORANGE_COLOR = '#FF9F45';

interface HeaderProps {
  colorScheme: string;
}

export const Header: React.FC<HeaderProps> = ({ colorScheme}) => {
  const loginContext = useContext(LoginContext)

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    loginContext.setAccessToken('');
    //onLogout();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
          SharedSpoons
        </Text>
        <Ionicons 
          name="restaurant" 
          size={28} 
          color={Colors[colorScheme].text} 
          style={styles.icon}
        />
        <TouchableOpacity onPress={handleLogout} style={styles.icon}>
        <Ionicons 
          name="log-out-outline" 
          size={28}
          color={Colors[colorScheme].text} 
          style={styles.icon}
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
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  icon: {
    marginLeft: 'auto',
    paddingTop: 2
  },
  divider: {
    height: 2,
    backgroundColor: ORANGE_COLOR,
    marginHorizontal: 20,
  },
});