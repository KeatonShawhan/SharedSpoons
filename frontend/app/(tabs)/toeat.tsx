// app/(tabs)/toEat.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToEatPage from '@/app/pages/toeat/toEatPage';
import ToEatDetails from '@/app/pages/toeat/toEatDetails';
import { PostStackNavigator, PostStackParamList } from '../navigation/PostStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';

export type ToEatStackParamList = {
  ToEatList: undefined;
  ToEatDetails: { id: string };
  PostStack: NavigatorScreenParams<PostStackParamList>; 
};

export type ToEatScreenNavigationProp = NativeStackNavigationProp<ToEatStackParamList>;

const Stack = createNativeStackNavigator<ToEatStackParamList>();

export default function ToEatTab() {
  return (
    <Stack.Navigator initialRouteName="ToEatList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ToEatList" component={ToEatPage} />
      <Stack.Screen name="ToEatDetails" component={ToEatDetails} />
      <Stack.Screen name="PostStack" component={PostStackNavigator} />
    </Stack.Navigator>
  );
}
