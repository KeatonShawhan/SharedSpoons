// AuthStack.js
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './pages/login/WelcomePage';
import LoginPage from './(tabs)/login';
import SignUpPage from './(tabs)/signup';
import { LoginProvider } from '@/contexts/loginContext';

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <LoginProvider>
      <AuthStack.Screen name="pages/login/LoginPage" component={LoginPage} options={{ headerShown: false  }} />
      <AuthStack.Screen name="pages/login/WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
      <AuthStack.Screen name="pages/login/SignUpPage" component={SignUpPage} options={{ headerShown: false }} />
    </LoginProvider>
    </AuthStack.Navigator>
  );
}
