// app/(tabs)/profile.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import MainScreen from '@/app/pages/profile/MainScreen';
import FriendsScreen from '@/app/pages/profile/FriendsScreen';
import PostPage from '@/app/pages/profilePost/ProfilePostScreen';
import { PostStackNavigator, PostStackParamList } from '../navigation/PostStackNavigator';
import MakePost from '@/app/pages/makePost/makepost';
import MakePostDetails from '@/app/pages/makePost/makepostDetails';

// Define ProfileStack params, including nested PostStack as PostPage's child route
export type ProfileStackParamList = {
  Main: undefined;
  Details: undefined;
};

// Export the navigation prop type
export type PostScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileTab() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MakePost} />
      <Stack.Screen name="Details" component={MakePostDetails} />
    </Stack.Navigator>
  );
}
