// app/(tabs)/index.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import HomeScreen from '../pages/home/HomeScreen';
import { PostStackNavigator } from '../navigation/PostStackNavigator';
import { PostStackParamList } from '../navigation/PostStackNavigator';

// Define HomeStack params, with nested PostStack
export type HomeStackParamList = {
  Home: undefined;
  PostStack: NavigatorScreenParams<PostStackParamList>;
};

// Export the navigation prop type
export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeTab() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PostStack" component={PostStackNavigator} />
    </Stack.Navigator>
  );
}
