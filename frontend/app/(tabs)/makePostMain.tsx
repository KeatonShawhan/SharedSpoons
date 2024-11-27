// makePostMain.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import MakePost from '@/app/pages/makePost/makepost';
import MakePostDetails from '@/app/pages/makePost/makepostDetails';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
// Define the navigation parameter list
export type MakePostScreenStackParamList = {
  Main: {
    repostDish?:string;
    repostRestaurant?: string;
  };
  Details: {
    selectedImage: string;
    dishname: string;
    restaurant: string;
  };
};

// Export the navigation prop type for the 'Main' screen
export type PostScreenNavigationProp = NativeStackNavigationProp<MakePostScreenStackParamList, 'Main'>;

const Stack = createNativeStackNavigator<MakePostScreenStackParamList>();

export default function MakePostMain() {

  const route = useRoute<RouteProp<{ MakePostRoot: { repostDish?: string, repostRestaurant?: string } }, 'MakePostRoot'>>();
  const repostDish = route.params?.repostDish || ''; 
  const repostRestaurant = route.params?.repostRestaurant || ''; 

  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MakePost} initialParams={{repostDish:repostDish, repostRestaurant:repostRestaurant}}/>
      <Stack.Screen name="Details" component={MakePostDetails} initialParams={{restaurant: repostRestaurant}} />
    </Stack.Navigator>
  );
}
