// profileNavigation.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import MainScreen from '@/app/pages/profile/MainScreen';
import FriendsScreen from '@/app/pages/profile/FriendsScreen';
import PostPage from '@/app/pages/profilePost/ProfilePostScreen';
import { PostStackNavigator, PostStackParamList } from '../../navigation/PostStackNavigator';
import { UUID } from '../../../../backend/src/types';

export type ProfileStackParamList = {
  Main: { 
    userId?: UUID;
    isFromProfileTab?: boolean;
    isFromHomeTab?: boolean; 
    isFromExploreTab?: boolean; 
    isFromComments?: boolean;
  };
  Friends: { initialTab: 'followers' | 'following'; userId?: UUID };
  PostPage: { postId: UUID, isOwnProfile: boolean };
  PostStack: NavigatorScreenParams<PostStackParamList>;
};

export type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

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