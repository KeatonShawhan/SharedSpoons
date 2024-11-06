import { Tabs } from 'expo-router';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import CenterButton from '@/components/CenterButton';
import { TouchableOpacity } from 'react-native';
import { MakePostButton } from '@/components/MakePostButton';
import LoginPage from '../pages/login/LoginPage';
import { LoginProvider } from '@/contexts/loginContext';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="makePostMain"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <MakePostButton color={color} focused={focused} />
          ),
          tabBarButton: (props) => <TouchableOpacity {...props} />, 
        }}
      />
      <Tabs.Screen
        name="toeat"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="silverware-fork-knife" style={{paddingTop:8}} size={24} color={color} />          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person-outline" size={24} style={{paddingTop:8}} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
