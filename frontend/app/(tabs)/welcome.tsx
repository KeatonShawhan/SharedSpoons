import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { RootTabParamList } from './_layout';
import { StackNavigationProp } from "@react-navigation/stack";

export default function Login() {

  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>();

  const toggleLoginPage = () => {
    navigation.navigate('login');
  }
  return (
    <View style={styles.container}>
      <FontAwesome
        name="cutlery"
        size={60}
        color="#FF9900"
        style={styles.logo}
      />
      <Text style={styles.appName}>Welcome to Shared Spoons</Text>
      
        <TouchableOpacity style={styles.button} onPress={toggleLoginPage}>
            <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>  );
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
    paddingRight: 45,
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
