// app/(tabs)/index.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeScreen from '../pages/home/HomeScreen';
import { CommentsScreen } from '../../components/postCard/screens/CommentsScreen';

// Define the navigation params type
export type HomeStackParamList = {
  Home: undefined;
  Comments: { postId: string };
};

// Export the navigation prop type
export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeTab() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
}
