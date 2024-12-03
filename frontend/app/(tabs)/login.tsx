import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image, // Import Image component
} from "react-native";
// Removed FontAwesome import since we're replacing it with an image
import Icon from 'react-native-vector-icons/Ionicons'; // Keep if you still use it for password icons
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginContext from "@/contexts/loginContext";
import API_URL from '../../config';
import { useNavigation } from "@react-navigation/native";
import { RootTabParamList } from './_layout';
import { StackNavigationProp } from "@react-navigation/stack";

// Import your custom logo image
/* eslint-disable */
const LogoImage = require('../../assets/images/FullSpoonsLogo.png'); // Adjust the path if necessary
/* eslint-enable */

export default function Login() {
  const loginContext = useContext(LoginContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [badLogin, setBadLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>();

  const handleInputChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("accessToken");
        if (storedToken) {
          loginContext.setAccessToken(storedToken);
          loginContext.setIsAuthenticated(true);
          navigation.navigate('index');
        }
      } catch (error) {
        console.log("Error loading token from AsyncStorage", error);
      }
    };
    loadToken();
  }, []);

  const sendLoginRequest = async () => {
    if (!user.username || !user.password) {
      Alert.alert("Validation Error", "Please enter both username and password.");
      return;
    }

    setLoading(true);
    setBadLogin(false);

    try {
      const response = await fetch(API_URL + 'auth/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setBadLogin(true);
        Alert.alert("Login Failed", json.message || "Incorrect username or password.");
        setLoading(false);
        return;
      }

      // Save token and update context
      await AsyncStorage.setItem("accessToken", json.accessToken);
      loginContext.setAccessToken(json.accessToken);
      loginContext.setUserId(json.id);
      loginContext.setUserName(json.username);
      loginContext.setFirstName(json.firstname);
      loginContext.setIsAuthenticated(true);
      setUser({ username: "", password: "" });
      setLoading(false);
      navigation.navigate('index');
    } catch (err) {
      setBadLogin(true);
      setLoading(false);
      console.log(err);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  const toggleAuthPage = () => {
    navigation.navigate('signup');
  }

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <Image
        source={LogoImage}
        style={styles.logo}
      />
      {/* App Name */}
      <Text style={styles.appName}>Shared Spoons</Text>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={user.username}
          onChangeText={(value) => {
            const formattedValue = value.replace(/[^a-zA-Z0-9_]/g, '');
            handleInputChange('username', formattedValue);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={user.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
          </TouchableOpacity>
        </View>
        {badLogin && <Text style={styles.badLogin}>Incorrect username or password</Text>}

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={sendLoginRequest} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={toggleAuthPage}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 60, // Adjust based on your logo image dimensions
    height: 60, // Adjust based on your logo image dimensions
    marginBottom: 10,
    resizeMode: 'contain', // Ensures the image scales correctly
  },
  appName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FF9900',
    marginBottom: 25,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 45,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 15,
  },
  passwordInput: {
    width: '100%',
    height: 45,
    paddingHorizontal: 15,
    paddingRight: 45, // Space for the icon
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  badLogin: {
    width: '100%',
    textAlign: 'left',
    color: '#e74c3c',
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 14,
  },
  button: {
    width: '100%',
    backgroundColor: '#FF9900',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF9900',
  },
  signUpText: {
    color: '#FF9900',
    fontSize: 16,
    fontWeight: '600',
  },
});
