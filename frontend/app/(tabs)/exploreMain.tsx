// exploreMain.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Explore from '@/app/pages/explore/explore';
import PostDetails from '@/app/pages/explore/postDetails';
import ProfileNavigation from '@/app/pages/profile/profileNavigation'; // Import the ProfileNavigation stack

// Define the navigation parameter list
export type ExploreScreenStackParamList = {
  Main: undefined;
  Details: { postId: string };
  ProfileRoot: undefined; // Route to embed the entire Profile stack
};

// Export the navigation prop type for the 'Main' screen
export type ExploreScreenNavigationProp = NativeStackNavigationProp<ExploreScreenStackParamList, 'Main'>;

const Stack = createNativeStackNavigator<ExploreScreenStackParamList>();

export default function ExploreMain() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Explore} />
      <Stack.Screen name="Details" component={PostDetails} />
      {/* Embed ProfileNavigation for infinite profile navigation */}
      <Stack.Screen name="ProfileRoot" component={ProfileNavigation} />
    </Stack.Navigator>
  );
}
