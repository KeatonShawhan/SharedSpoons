// app/(tabs)/profile.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import MainScreen from '@/app/pages/profile/MainScreen';
import FriendsScreen from '@/app/pages/profile/FriendsScreen';
import PostPage from '@/app/pages/profilePost/ProfilePostScreen';
import { PostStackNavigator, PostStackParamList } from '../navigation/PostStackNavigator';
import { useProfile } from '@/contexts/profileContext';
import ProfileScreen from '../pages/profile/profileScreen';
// Define ProfileStack params, including nested PostStack as PostPage's child route
export type ProfileStackParamList = {
  Main: undefined;
  Friends: { initialTab: 'followers' | 'following' };
  PostPage: undefined; // Navigates directly to PostPage screen
  PostStack: NavigatorScreenParams<PostStackParamList>; // Nested PostStack here
};

// Export the navigation prop type
export type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileTab() {
  const {  } = useProfile();
  return (
    <ProfileScreen user_id={'hihihi'}/>
  );
}
