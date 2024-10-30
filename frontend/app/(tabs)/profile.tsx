import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import MainScreen from '@/app/pages/profile/MainScreen';
import FriendsScreen from '@/app/pages/profile/FriendsScreen';
import PostPage from '@/app/pages/profilePost/ProfilePostScreen'

// Define the navigation params type
export type ProfileStackParamList = {
  Main: undefined;
  Friends: {
    initialTab: 'followers' | 'following';
  };
  PostPage: undefined;
};

// Export the navigation prop type
export type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileTab() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="PostPage" component={PostPage}/>
    </Stack.Navigator>
  );
}