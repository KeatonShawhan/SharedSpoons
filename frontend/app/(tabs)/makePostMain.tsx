// makePostMain.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import MakePost from '@/app/pages/makePost/makepost';
import MakePostDetails from '@/app/pages/makePost/makepostDetails';

// Define the navigation parameter list
export type MakePostScreenStackParamList = {
  Main: undefined;
  Details: {
    selectedImage: string;
    dishname: string;
  };
};

// Export the navigation prop type for the 'Main' screen
export type PostScreenNavigationProp = NativeStackNavigationProp<MakePostScreenStackParamList, 'Main'>;

const Stack = createNativeStackNavigator<MakePostScreenStackParamList>();

export default function MakePostMain() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MakePost} />
      <Stack.Screen name="Details" component={MakePostDetails} />
    </Stack.Navigator>
  );
}
