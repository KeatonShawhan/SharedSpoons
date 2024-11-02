// app/navigation/PostStackNavigator.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommentsScreen } from '@/components/postCard/screens/CommentsScreen';

export type PostStackParamList = {
  Comments: { 
    postId: string;
    parentTab: 'HomeTab' | 'ProfileTab' | 'ToEatTab';
  };
};

// Navigation prop type for screens within PostStack
export type CommentsScreenNavigationProp = NativeStackNavigationProp<PostStackParamList, 'Comments'>;

const PostStack = createNativeStackNavigator<PostStackParamList>();

export function PostStackNavigator() {
  return (
    <PostStack.Navigator screenOptions={{ headerShown: false }}>
      <PostStack.Screen name="Comments" component={CommentsScreen} />
    </PostStack.Navigator>
  );
}
