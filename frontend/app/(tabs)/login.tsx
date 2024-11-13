import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginContext from "@/contexts/loginContext";
import API_URL from '../../config'
import { useNavigation } from "expo-router";
import { RootTabParamList } from './_layout';
import { StackNavigationProp } from "@react-navigation/stack";

export default function login() {
  const loginContext = useContext(LoginContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [badLogin, setBadLogin] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>(); // Use the correct type here

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

    fetch(API_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const out = res.json();
        if (!res.ok) {
          setBadLogin(true);
          return res.text();
        }
        return out;
      })
      .then((json) => {
        console.log(json);
        loginContext.setAccessToken(json.accessToken);
        loginContext.setUserId(json.id);
        loginContext.setUserName(json.username);
        AsyncStorage.setItem("accessToken", json.accessToken);
        loginContext.setFirstName(json.firstName);
        loginContext.setIsAuthenticated(true);
        navigation.navigate('index')
      })
      .catch((err) => {
        setBadLogin(true);
        console.log(err);
      });
  };

  const toggleAuthPage = () => {
    loginContext.setIsLogin(!loginContext.isLogin);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      {badLogin && <Text style={styles.badLogin}>Incorrect username or password</Text>}
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
  