// app/(tabs)/profile.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import MainScreen from '@/app/pages/profile/MainScreen';
import FriendsScreen from '@/app/pages/profile/FriendsScreen';
import PostPage from '@/app/pages/profilePost/ProfilePostScreen';
import { PostStackNavigator, PostStackParamList } from '../navigation/PostStackNavigator';
import { UUID } from '../../../backend/src/types';
import LoginContext from '@/contexts/loginContext';
import { useContext, useEffect } from 'react';
import API_URL from '@/config';
import ProfileNavigation, { ProfileStackParamList } from '../pages/profile/profileNavigation';

// Define the param list for the ProfileTab navigator
export type ProfileTabParamList = {
  ProfileRoot: NavigatorScreenParams<ProfileStackParamList>;
};

// Create a navigator for ProfileTab
const ProfileTabStack = createNativeStackNavigator<ProfileTabParamList>();

export default function ProfileTab() {
  return (
    <ProfileTabStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileTabStack.Screen 
        name="ProfileRoot" 
        component={ProfileNavigation}
      />
    </ProfileTabStack.Navigator>
  );
}