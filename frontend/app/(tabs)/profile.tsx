// app/(tabs)/profile.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import ProfileNavigation, { ProfileStackParamList } from '../pages/profile/profileNavigation';

// Define the param list for the ProfileTab navigator
export type ProfileTabParamList = {
  ProfileRoot: NavigatorScreenParams<ProfileStackParamList>;
};

const ProfileTabStack = createNativeStackNavigator<ProfileTabParamList>();

export default function ProfileTab() {
  return (
    <ProfileTabStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileTabStack.Screen 
        name="ProfileRoot" 
        component={ProfileNavigation}
        initialParams={{
          screen: 'Main',
          params: {
            isFromProfileTab: true,
            isFromHomeTab: false,
            isFromExploreTab: false
          }
        }}
      />
    </ProfileTabStack.Navigator>
  );
}