// app/(tabs)/index.tsx
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import HomeScreen from '../pages/home/HomeScreen';
import ProfileTab, { ProfileTabParamList } from './profile';  // Import ProfileTabParamList
import { PostStackNavigator, PostStackParamList } from '../navigation/PostStackNavigator';
import { useNavigation } from 'expo-router';
import LoginContext from '@/contexts/loginContext';
import { useContext,} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from './_layout';
// Define HomeStack params, with nested ProfileNavigation and PostStack
export type HomeStackParamList = {
  Home: undefined;
  ProfileTab: NavigatorScreenParams<ProfileTabParamList> & {
    // Add this additional parameter that will be passed through the navigation
    isFromHomeTab?: boolean;
  };
  PostStack: NavigatorScreenParams<PostStackParamList>;
};

// Export the navigation prop type
export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>()



export default function HomeTab() {
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>(); // Use the correct type here
  const loginContext = useContext(LoginContext);

  if(loginContext.isAuthenticated == false) {
    navigation.navigate('welcome');
  }

  return (
    <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
      />
      <Stack.Screen 
        name="ProfileTab" 
        component={ProfileTab}
        initialParams={{ isFromHomeTab: true }} // Set default value
      />
      <Stack.Screen 
        name="PostStack" 
        component={PostStackNavigator} 
      />
    </Stack.Navigator>
  );
}