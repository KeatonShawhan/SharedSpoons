// components/post/navigation/postNavigator.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { CommentsScreen } from './screens/CommentsScreen';

export type PostStackParamList = {
  Comments: { 
    postId: string;
    parentTab: 'HomeTab' | 'ProfileTab' | 'ToEatTab';
  };
};

// Navigation and route prop types for CommentsScreen
export type CommentsScreenNavigationProp = NativeStackNavigationProp<PostStackParamList, 'Comments'>;
export type CommentsScreenRouteProp = RouteProp<PostStackParamList, 'Comments'>;

const Stack = createNativeStackNavigator<PostStackParamList>();

export function PostNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
}
