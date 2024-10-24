import { createStackNavigator } from '@react-navigation/stack'; // Ensure you're using this
import React from 'react';
import HomePage from '../pages/homePage'; 

const Stack = createStackNavigator();

export default function ToEatTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ToEatList" 
        component={HomePage} 
        options={{ title: 'To-Eat' }} 
      />
      <Stack.Screen 
        name="PostDetails" 
        component={HomePage} 
        options={{ title: 'Post Details' }} 
      />
    </Stack.Navigator>
  );
}