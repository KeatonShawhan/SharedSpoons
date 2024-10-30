import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LoginContext from "@/contexts/loginContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface LoginPageProps {
  setIsAuthenticated: (authenticated: boolean) => void;
}

const LoginPage: React.FC<{ setIsAuthenticated: (authenticated: boolean) => void; toggleAuthPage: () => void; }> = ({ setIsAuthenticated, toggleAuthPage }) => {
  const loginContext = useContext(LoginContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(true);
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
    console.log(JSON.stringify(user));
    fetch('http://localhost:443/api/v0/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          setBadLogin(true);
        }
        return res.json();
      })
      .then((json) => {
        // localStorage.setItem('userId', JSON.stringify(json.user.id));
        loginContext.setAccessToken(json.token);
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
  

export default LoginPage;
