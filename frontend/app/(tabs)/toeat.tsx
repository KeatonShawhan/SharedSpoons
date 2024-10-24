import { createStackNavigator } from '@react-navigation/stack'; // Ensure you're using this
import React from 'react';
import ToEatPage from '../pages/toEatPage'; 
import ToEatDetails from '../pages/toEatDetails';
const Stack = createStackNavigator();

export default function ToEatTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ToEatList" 
        component={ToEatPage} 
        options={{ title: 'To-Eat' }} 
      />
      <Stack.Screen 
        name="PostDetails" 
        component={ToEatDetails} 
        options={{ title: 'Post Details' }} 
      />
    </Stack.Navigator>
  );
}