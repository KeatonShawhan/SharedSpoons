// app/navigation/PostStackNavigator.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommentsScreen } from '@/components/postCard/screens/CommentsScreen';
import ProfileNavigation from '@/app/pages/profile/profileNavigation';
import { UUID } from '../../../backend/src/types';

// Define the profile params separately
type ProfileRootParams = {
  screen: 'Main';
  params: {
    userId: UUID;
    isFromComments?: boolean;
  };
};

export type PostStackParamList = {
  Comments: { 
    postId: UUID;
    parentTab: 'HomeTab' | 'ProfileTab' | 'ToEatTab' | 'ExploreTab';
  };
  ProfileRoot: ProfileRootParams;
};

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