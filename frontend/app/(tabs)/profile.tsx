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
import ProfileNavigation from '../pages/profile/profileNavigation';



export default function ProfileTab() {

  
  return (
    <ProfileNavigation/>
  );
}