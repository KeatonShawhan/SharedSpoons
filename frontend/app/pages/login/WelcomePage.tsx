import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LoginContext from "@/contexts/loginContext";

interface LoginPageProps {
  setIsAuthenticated: (authenticated: boolean) => void;
}

export default function WelcomePage () {

  return (
    <View>
      <Text>hi</Text>
    </View>
  );
};


  

