import { Tabs } from 'expo-router';
import React, { useContext, useState, useEffect } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { MakePostButton } from '@/components/MakePostButton';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginProvider } from '@/contexts/loginContext';
import LoginContext from '@/contexts/loginContext';

export type RootTabParamList = {
  index: undefined; // Define your screens here
  exploreMain: undefined;
  makePostMain: undefined;
  toeat: undefined;
  profile: { userId: string }; // Example for a screen that takes params
  login: undefined; // For login screen
  signup: undefined; // For signup screen
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      loginContext.setIsAuthenticated(!!token);  // Set authentication state based on token
    };
    checkAuth();
  }, []);


  // If authenticated, show the main app content
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
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
        name="exploreMain"
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
            <MaterialCommunityIcons name="silverware-fork-knife" style={{ paddingTop: 8 }} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        initialParams={{ userId: loginContext.userId }}
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person-outline" size={24} style={{ paddingTop: 8 }} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }, // Always hide the signup tab
          tabBarIcon: () => null,
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }, // Always hide the signup tab
          tabBarIcon: () => null,
          tabBarLabel: () => null,
        }}
        />
    </Tabs>
  );
}
