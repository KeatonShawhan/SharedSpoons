// profileNavigation.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '@/app/pages/profile/MainScreen';
import FriendsScreen from '@/app/pages/profile/FriendsScreen';
import PostPage from '@/app/pages/profilePost/ProfilePostScreen';
import { PostStackNavigator } from '../../navigation/PostStackNavigator';
import { ProfileStackParamList } from './navigationTypes';


const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
      />
      <Stack.Screen 
        name="Friends" 
        component={FriendsScreen} 
        initialParams={{ initialTab: 'followers' }}
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