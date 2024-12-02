// app/navigation/PostStackNavigator.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommentsScreen } from '@/components/postCard/screens/CommentsScreen';
import ProfileNavigation from '@/app/pages/profile/profileNavigation';
import {PostStackParamList} from '../pages/profile/navigationTypes';

export type PostStackNavigationProp = NativeStackNavigationProp<PostStackParamList>;

const PostStack = createNativeStackNavigator<PostStackParamList>();

export function PostStackNavigator() {
  return (
    <PostStack.Navigator screenOptions={{ headerShown: false }}>
      <PostStack.Screen 
        name="Comments" 
        component={CommentsScreen} 
      />
      <PostStack.Screen 
        name="ProfileRoot" 
        component={ProfileNavigation}
      />
    </PostStack.Navigator>
  );
}