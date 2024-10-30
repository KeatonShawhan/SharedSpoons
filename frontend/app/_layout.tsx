import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import AuthNavigator from './AuthStack';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginPage from '@/app/pages/login/LoginPage';
import { LoginProvider } from "@/contexts/loginContext";
import SignUpPage from './pages/signup/SignUpPage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const toggleAuthPage = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Conditional rendering based on authentication state */}
      {isAuthenticated ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        <LoginProvider>
          <AuthNavigator /> 
        </LoginProvider>
        // <LoginProvider>
        //    <LoginProvider>
        //   <AuthNavigator /> {/* Render the Auth Navigator when not authenticated */}
        // </LoginProvider>
        //   {/* {isLogin ? (
        //     <LoginPage setIsAuthenticated={setIsAuthenticated} toggleAuthPage={toggleAuthPage} />
        //   ) : (
        //     <SignUpPage setIsAuthenticated={setIsAuthenticated} toggleAuthPage={toggleAuthPage} />
        //   )} */}
        // </LoginProvider>
      )}
    </ThemeProvider>
  );
}
