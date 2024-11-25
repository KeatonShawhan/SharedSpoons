import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginContext from "@/contexts/loginContext";
import API_URL from '../../config';
import { useNavigation } from "@react-navigation/native";
import { RootTabParamList } from './_layout';
import { StackNavigationProp } from "@react-navigation/stack";

export default function Signup() {
  const loginContext = useContext(LoginContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
    phoneNumber: "",
    firstname: "",
    lastname: "",
    email: "",
    location: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [badSignup, setBadSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>();

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
    }
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loginContext.accessToken && loginContext.accessToken.length > 0) {
      loginContext.setIsAuthenticated(true);
      navigation.navigate('index');
    }
  }, [loginContext.accessToken]);

  const sendSignUpRequest = async () => {
    const { username, password, phoneNumber, email, firstname, lastname } = user;
    if (!username || !password || !phoneNumber || !email || !firstname || !lastname) {
      Alert.alert("Validation Error", "Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setBadSignup(false);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setBadSignup(true);
        Alert.alert("Sign Up Failed", json.message || "Username or email already in use.");
        setLoading(false);
        return;
      }

      // Save token and update context
      await AsyncStorage.setItem("accessToken", json.accessToken);
      loginContext.setAccessToken(json.accessToken);
      loginContext.setUserId(json.id);
      loginContext.setFirstName(json.firstname);
      loginContext.setUserName(json.username);
      loginContext.setIsAuthenticated(true);
      setUser({
        username: "",
        password: "",
        phoneNumber: "",
        firstname: "",
        lastname: "",
        email: "",
        location: ""
      });
      setLoading(false);
      navigation.navigate('index');
    } catch (err) {
      setBadSignup(true);
      setLoading(false);
      console.log(err);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  const toggleAuthPage = () => {
    navigation.navigate('login');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Logo */}
      <FontAwesome
        name="cutlery"
        size={60}
        color="#FF9900"
        style={styles.logo}
      />
      {/* App Name */}
      <Text style={styles.appName}>Shared Spoons</Text>

      {/* Sign Up Form */}
      <View style={styles.formContainer}>
        {badSignup && (
          <Text style={styles.badSignup}>Username or email already in use.</Text>
        )}
        
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={user.username}
          onChangeText={(value) => {
            const formattedValue = value.replace(/[^a-zA-Z0-9_]/g, '');
            handleInputChange('username', formattedValue);
          }}
          autoCapitalize="none"
          keyboardType="default"
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
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={user.phoneNumber}
          onChangeText={(value) => {
            const cleaned = value.replace(/\D/g, '').slice(0, 10);
            const formatted = formatPhoneNumber(cleaned);
            handleInputChange('phoneNumber', formatted);
          }}
          autoCapitalize="none"
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={user.email}
          onChangeText={(value) => handleInputChange('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={user.location}
          onChangeText={(value) => {
            const formattedValue = value.replace(/[^a-zA-Z0-9_ ]/g, '');
            handleInputChange('location', formattedValue);
          }}
          autoCapitalize="none"
          keyboardType="default"
          placeholderTextColor="#999"
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
            autoCapitalize="words"
            keyboardType="default"
            placeholderTextColor="#999"
          />
          <TextInput
            style={[styles.input, styles.nameInput]}
            placeholder="Last Name"
            value={user.lastname}
            onChangeText={(value) => {
              const formattedValue = value.replace(/[0-9]/g, '').slice(0, 10);
              handleInputChange('lastname', formattedValue);
            }}
            autoCapitalize="words"
            keyboardType="default"
            placeholderTextColor="#999"
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={sendSignUpRequest}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={toggleAuthPage}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  logo: {
    marginBottom: 10,
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
  badSignup: {
    width: '100%',
    textAlign: 'left',
    color: '#e74c3c',
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 14,
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
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  nameInput: {
    width: '48%',
  },
  button: {
    width: '100%',
    backgroundColor: '#FF9900',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF9900',
  },
  loginText: {
    color: '#FF9900',
    fontSize: 16,
    fontWeight: '600',
  },
});
