import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LoginContext from "@/contexts/loginContext";
import API_URL from '../../config';
import { useNavigation } from "expo-router";
import { RootTabParamList } from './_layout';
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function signup () {
  const loginContext = useContext(LoginContext);
  const [user, setUser] = useState({ username: "", password: "", phoneNumber: "", firstname: "", lastname: "", email: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [badSignup, setBadSignup] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>(); // Use the correct type here

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return [match[1] && `(${match[1]}`, match[2] && `) ${match[2]}`, match[3] && `-${match[3]}`]
        .filter(Boolean)
        .join("");
    }
    return phone;
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "phoneNumber") {
      value = formatPhoneNumber(value);
    };
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loginContext.accessToken && loginContext.accessToken.length > 0) {
      loginContext.setIsAuthenticated(true);
    }
  }, [loginContext.accessToken]);

  const sendSignUpRequest = () => {
    if (!user.username || !user.password || !user.phoneNumber || !user.email || !user.firstname || !user.lastname) {
      Alert.alert("Validation Error", "Please fill out all fields.");
      return;
    }

    fetch(API_URL + '/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          setBadSignup(true);
          return res.text();
        }
        return res.json();
      })
      .then((json) => {
        loginContext.setAccessToken(json.accessToken);
        loginContext.setUserId(json.id);
        loginContext.setUserName(json.firstname + " " + json.lastname);
        AsyncStorage.setItem("accessToken", json.accessToken);
        loginContext.setIsAuthenticated(true);
        setUser({ username: "", password: "", phoneNumber: "", firstname: "", lastname: "", email: "" });
        navigation.navigate('index')
      })
      .catch((err) => {
        setBadSignup(true);
        console.log(err);
      });
  };

  const toggleAuthPage = () => {
    loginContext.setIsLogin(!loginContext.isLogin);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {badSignup ? 
            <Text style={styles.badSignup}>Username or email already in use.</Text>
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
          onChangeText={(value) => {
            const formattedValue = value.replace(/[^a-zA-Z0-9_]/g, '');
            handleInputChange('password', formattedValue);
          }}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={user.phoneNumber}
        onChangeText={(value) => {
          const formattedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
          handleInputChange('phoneNumber', formattedValue);
        }}
        autoCapitalize="none"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(value) => handleInputChange('email', value)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <View style={styles.nameContainer}>
        <TextInput
          style={[styles.input, styles.nameInput]}
          placeholder="First Name"
          value={user.firstname}
          onChangeText={(value) => {
            const formattedValue = value.replace(/[0-9]/g, '').slice(0, 10);
            handleInputChange('firstname', formattedValue);
          }}
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, styles.nameInput]}
          placeholder="Last Name"
          value={user.lastname}
          onChangeText={(value) => {
            const formattedValue = value.replace(/[0-9]/g, '').slice(0, 10);
            handleInputChange('lastname', formattedValue);
          }}
          autoCapitalize="none"
        />
      </View>
      <Button title="Continue" onPress={sendSignUpRequest} color="#FF9900" />
      <Button title="Login" onPress={toggleAuthPage} />
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
  badSignup: {
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
    marginBottom: 10
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
    marginBottom: 10
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    transform: [{ translateY: 10 }],
    zIndex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  nameInput: {
    width: '48%',
  },
});
