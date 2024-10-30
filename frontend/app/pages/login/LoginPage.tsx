import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LoginContext from "@/contexts/loginContext";

interface LoginPageProps {
  setIsAuthenticated: (authenticated: boolean) => void;
}

export default function LoginPage ({ setIsAuthenticated, toggleAuthPage }) {
  const loginContext = useContext(LoginContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(true);



  const handleInputChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loginContext.accessToken && loginContext.accessToken.length > 0) {
      setIsAuthenticated(true);
    }
  }, [loginContext.accessToken, setIsAuthenticated]);

  const sendLoginRequest = () => {
    // Placeholder token; replace with actual token on successful login
    loginContext.setAccessToken("testToken");

    // Validate form fields
    if (!user.username || !user.password) {
        Alert.alert("Validation Error", "Please enter both username and password.");
        return;
    }

    // Send fetch request to login API
    fetch(`http://localhost:3010/api/v0/post/all`, {  // Update with your base URL
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((res) => res.json())
    .then((messagesData) => {
      Alert.alert('Login Request', `Username: ${user.username}, Password: ${user.password}`);
    })
    .catch((error) => {
      console.error("Error during login:", error);
      Alert.alert("Error", "Failed to complete login request.");
    });
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
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
      />
      <View style={styles.passwordContainer}>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} />
        </TouchableOpacity>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={user.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry={!showPassword}
        />
      </View>
      <Button title="Continue" onPress={sendLoginRequest} color="#FF9900" />
      <Button title="Sign Up" onPress={toggleAuthPage} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: '90%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    passwordContainer: {
      position: 'relative',
      width: '90%',
    },
    passwordInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingRight: 40,
      },
      iconContainer: {
        position: 'absolute',
        right: 10,
        transform: [{ translateY: 10 }],
        zIndex: 1,
      },
  });
  