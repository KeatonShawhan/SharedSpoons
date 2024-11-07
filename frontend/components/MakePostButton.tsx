import React from 'react';
import { View, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface MakePostButtonProps {
  focused: boolean;
}

export const MakePostButton: React.FC<MakePostButtonProps> = ({ focused }) => {  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, focused && styles.focusedContainer]}>
      <AntDesign 
        name="plussquare" 
        size={28} 
        color={focused ? Colors[colorScheme].tint : 'grey'} 
      />
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
    marginTop: 7, 
  },
  focusedContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
  },
});
