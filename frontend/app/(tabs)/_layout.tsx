import { Tabs } from 'expo-router';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ProfileProvider } from '../../contexts/profileContext'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import CenterButton from '@/components/CenterButton';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProfileProvider> 
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="makepost"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <CenterButton/>
          ),
        }}
      />
      <Tabs.Screen
        name="toeat"
        options={{
          title: 'To-Eat',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="silverware-fork-knife" style={{paddingTop:8}} size={24} color={color} />          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person-outline" size={24} style={{paddingTop:8}} color={color} />
          ),
        }}
      />
    </Tabs>
    </ProfileProvider>
  );
}
