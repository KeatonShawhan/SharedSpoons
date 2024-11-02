import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LoginContext from "@/contexts/loginContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../../config'

interface LoginPageProps {
  setIsAuthenticated: (authenticated: boolean) => void;
}

export default function LoginPage ({ setIsAuthenticated, toggleAuthPage }) {
  const loginContext = useContext(LoginContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [badLogin, setBadLogin] = useState(false);

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
  }, [loginContext.accessToken]);

  const sendLoginRequest = () => {
    // Validate form fields
    if (!user.username || !user.password) {
      Alert.alert("Validation Error", "Please enter both username and password.");
      return;
    }
    fetch(API_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          setBadLogin(true);
          return res.text();
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        // localStorage.setItem('userId', JSON.stringify(json.user.id));
      
        loginContext.setAccessToken(json.accessToken);
        // localStorage.setItem('username', JSON.stringify(json.user.credentials.username));
      })
      .catch((err) => {
        setBadLogin(true);
        console.log(err);
      });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      {badLogin ? 
            <Text style={styles.badLogin}>Incorrect username or password</Text>
        : undefined}
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
          autoCapitalize="none"
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
      marginBottom: 10,
    },
    badLogin: {
      fontSize: 14,
      marginBottom: 10,
      color: "red"
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
  