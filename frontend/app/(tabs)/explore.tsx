import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, View, Text, StatusBar } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  SignInResponse
} from "@react-native-google-signin/google-signin";

import { useEffect, useState } from 'react';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [error, setError] = useState<Error | undefined>();
  const [userInfo, setUserInfo] = useState<SignInResponse | undefined>(undefined);

  const configureGoogleSignin = () => {
    GoogleSignin.configure({
      iosClientId: "534693056287-paa8r7p79enuq2u91j32eireombub6qv.apps.googleusercontent.com"
    })
  }

  useEffect(() => {
    configureGoogleSignin();
  });

  const SignIn = async () => {
    console.log("Pressed sign in");

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError(undefined);
    } catch (e) {
      setError(e);
    }
  };

  const logout = () => {
    setUserInfo(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };



  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(error)}</Text>
      {userInfo && <Text>{JSON.stringify(userInfo.data.user)}</Text>}
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={SignIn}
        />
      )}
      <StatusBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});