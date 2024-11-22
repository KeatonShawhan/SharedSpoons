// app/pages/explore/exploreMain.tsx

import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Explore from '@/app/pages/explore/explore';
import PostDetails from '@/app/pages/explore/postDetails';
import ProfileNavigation from '@/app/pages/profile/profileNavigation'; // Import the ProfileNavigation stack
import { NavigatorScreenParams } from '@react-navigation/native';
import { PostStackNavigator, PostStackParamList } from '../navigation/PostStackNavigator';



// Define the navigation parameter list
export type ExploreScreenStackParamList = {
  Main: undefined;
  Details: { postId: string };
  PostStack: NavigatorScreenParams<PostStackParamList>;
  ProfileRoot: { userId: string }; // Route to navigate to Profile with userId
};

// Export the navigation prop type for the 'Main' screen
export type ExploreScreenNavigationProp = NativeStackNavigationProp<ExploreScreenStackParamList, 'Main'>;

const Stack = createNativeStackNavigator<ExploreScreenStackParamList>();

export default function ExploreMain() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Explore} />
      <Stack.Screen name="Details" component={PostDetails} />
      <Stack.Screen name="PostStack" component={PostStackNavigator} />
      {/* Embed ProfileNavigation for infinite profile navigation */}
      <Stack.Screen name="ProfileRoot" component={ProfileNavigation} />
    </Stack.Navigator>
  );
}
