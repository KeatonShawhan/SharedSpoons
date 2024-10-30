// components/post/navigation/postNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommentsScreen } from './screens/CommentsScreen';

export type PostStackParamList = {
  Comments: { postId: string };
};

const Stack = createNativeStackNavigator<PostStackParamList>();

export function PostNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
}
