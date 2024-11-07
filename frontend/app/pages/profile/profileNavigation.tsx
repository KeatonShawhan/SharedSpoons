import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import MainScreen from '@/app/pages/profile/MainScreen';
import FriendsScreen from '@/app/pages/profile/FriendsScreen';
import PostPage from '@/app/pages/profilePost/ProfilePostScreen';
import { PostStackNavigator, PostStackParamList } from '../../navigation/PostStackNavigator';
import { UUID } from '../../../../backend/src/types';

// Update ProfileStack params to include postId in PostPage
export type ProfileStackParamList = {
  Main: { 
    userId?: UUID;
    isFromProfileTab?: boolean;
    isFromHomeTab?: boolean; // Add this parameter
  };
  Friends: { initialTab: 'followers' | 'following'; userId?: UUID };
  PostPage: { postId: UUID };
  PostStack: NavigatorScreenParams<PostStackParamList>;
};

// Export the navigation prop type
export type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigation() {

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false, // Hide headers for each screen
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        // New `MainScreen` instance will be created each time it's accessed
      />
      <Stack.Screen 
        name="Friends" 
        component={FriendsScreen} 
        initialParams={{ initialTab: 'followers' }} // Set initial tab to 'followers' in FriendsScreen
      />
      <Stack.Screen 
        name="PostPage" 
        component={PostPage} 
      />
      <Stack.Screen 
        name="PostStack" 
        component={PostStackNavigator} 
      />
    </Stack.Navigator>
  );
}