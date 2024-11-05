import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import MainScreen from '@/app/pages/profile/MainScreen';
import FriendsScreen from '@/app/pages/profile/FriendsScreen';
import PostPage from '@/app/pages/profilePost/ProfilePostScreen';
import { PostStackNavigator, PostStackParamList } from '../navigation/PostStackNavigator';
import { UUID } from '../../../backend/src/types';

// Update ProfileStack params to include postId in PostPage
export type ProfileStackParamList = {
  Main: undefined;
  Friends: { initialTab: 'followers' | 'following' };
  PostPage: { postId: UUID }; // Add postId parameter
  PostStack: NavigatorScreenParams<PostStackParamList>;
};

// Export the navigation prop type
export type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileTab() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="PostPage" component={PostPage} />
      <Stack.Screen name="PostStack" component={PostStackNavigator} />
    </Stack.Navigator>
  );
}