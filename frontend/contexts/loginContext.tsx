// contexts/LoginContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "expo-router";
import { RootTabParamList } from '@/app/(tabs)/_layout';
import { StackNavigationProp } from "@react-navigation/stack";
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  iat: number;
  exp: number;
}

interface LoginContextType {
  accessToken: string;
  setAccessToken: (token: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  userName: string;
  setUserName: (userId: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  followed: boolean;
  setFollowed: (followed: boolean) => void;
  addedEat:boolean;
  setAddedEat: (followed: boolean) => void;
  commented:boolean;
  setCommented: (commented: boolean) => void;
  madePost:boolean;
  setMadePost: (commented: boolean) => void;
  firstName:string;
  setFirstName: (firstName: string) => void;
  handleLogout: () => void;
  decodeToken: () => void;
  isInitialized: boolean;
  setIsInitialized: (isInitialized: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [followed, setFollowed] = useState<boolean>(true);
  const [commented, setCommented] = useState<boolean>(true);
  const [addedEat, setAddedEat] = useState<boolean>(true);
  const [madePost, setMadePost] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      await decodeToken();
      setIsInitialized(true); // Mark as initialized
    };
    initialize();
  }, []);

  const decodeToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      console.log('No token found');
      setIsInitialized(true);
      return;
    }
    const decoded: DecodedToken = jwtDecode(token);
    setUserId(decoded.id);
    setUserName(decoded.username);
    setFirstName(decoded.firstname);
    console.log("token: ", token);
    setAccessToken(token);
    console.log('Decoded token:', decoded);
  };
  

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setAccessToken('');
    navigation.navigate('login');
    setIsAuthenticated(false);
  };

  return (
    <LoginContext.Provider value={{madePost, setMadePost, commented, setCommented, addedEat, setAddedEat, followed, setFollowed, userName, setUserName, accessToken, setAccessToken, userId, setUserId, isAuthenticated, setIsAuthenticated, firstName, setFirstName, handleLogout, decodeToken, isInitialized, setIsInitialized }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
