// app/(tabs)/toEat.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ToEatPage from '@/app/pages/toeat/toEatPage';
import ToEatDetails from '@/app/pages/toeat/toEatDetails';
import { PostStackNavigator, PostStackParamList } from '../navigation/PostStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import ProfileNavigation, { ProfileStackParamList } from '@/app/pages/profile/profileNavigation';
import MakePostMain, { MakePostScreenStackParamList } from './makePostMain';

// Update ToEatStackParamList to include ProfileRoot
export type ToEatStackParamList = {
  ToEatList: undefined;
  ToEatDetails: { id: string };
  PostStack: NavigatorScreenParams<PostStackParamList>;
  ProfileRoot: NavigatorScreenParams<ProfileStackParamList>;
  MakePostRoot: {repostDish?:string, repostRestaurant?:string};
};

export type ToEatScreenNavigationProp = NativeStackNavigationProp<ToEatStackParamList>;

const Stack = createNativeStackNavigator<ToEatStackParamList>();

export default function ToEatTab() {
  return (
    <Stack.Navigator initialRouteName="ToEatList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ToEatList" component={ToEatPage} />
      <Stack.Screen name="ToEatDetails" component={ToEatDetails} />
      <Stack.Screen name="PostStack" component={PostStackNavigator} />
      <Stack.Screen name="ProfileRoot" component={ProfileNavigation} />
      <Stack.Screen name="MakePostRoot" initialParams={{repostDish: '', repostRestaurant: ''}}
       component={MakePostMain} />
    </Stack.Navigator>
  );
}