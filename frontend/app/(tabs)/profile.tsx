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

// Update ProfileStack params to include postId in PostPage
export type ProfileStackParamList = {
  Main: {userId : UUID};
  Friends: {userId:UUID, initialTab: 'followers' | 'following' };
  PostPage: { postId: UUID }; // Add postId parameter
  PostStack: NavigatorScreenParams<PostStackParamList>;
};

// Export the navigation prop type
export type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileTab({route}) {
  const { userId } = route.params;

  
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        initialParams={{ userId }} // Pass userID to MainScreen
      />
      <Stack.Screen 
        name="Friends" 
        component={FriendsScreen} 
        initialParams={{ userId, initialTab: 'followers' }} // Pass userID to FriendsScreen
      />
      <Stack.Screen name="PostPage" component={PostPage} />
      <Stack.Screen name="PostStack" component={PostStackNavigator} />
    </Stack.Navigator>
  );
}