import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import LoginPage from '@/app/pages/login/LoginPage';
import { LoginProvider } from "@/contexts/loginContext";
import SignUpPage from './pages/signup/SignUpPage';
import LoginContext from '@/contexts/loginContext';
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
    <LoginProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Conditional rendering based on authentication state */}
      {isAuthenticated ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
          isLogin ? (
            <LoginPage setIsAuthenticated={setIsAuthenticated} toggleAuthPage={toggleAuthPage} />
          ) : (
            <SignUpPage setIsAuthenticated={setIsAuthenticated} toggleAuthPage={toggleAuthPage} />
          )
      )}
    </ThemeProvider>
    </LoginProvider>
  );
}