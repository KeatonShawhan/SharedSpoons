// AuthStack.js
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './pages/login/WelcomePage';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/signup/SignUpPage';

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="pages/login/LoginPage" component={LoginPage} options={{ headerShown: false  }} />
      <AuthStack.Screen name="pages/login/WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
      <AuthStack.Screen name="pages/login/SignUpPage" component={SignUpPage} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}
