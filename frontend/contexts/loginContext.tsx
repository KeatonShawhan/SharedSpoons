// contexts/LoginContext.tsx
import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "expo-router";
import { RootTabParamList } from '@/app/(tabs)/_layout';
import { StackNavigationProp } from "@react-navigation/stack";

interface LoginContextType {
  accessToken: string;
  setAccessToken: (token: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  userName: string;
  setUserName: (userId: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
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
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [followed, setFollowed] = useState<boolean>(true);
  const [commented, setCommented] = useState<boolean>(true);
  const [addedEat, setAddedEat] = useState<boolean>(true);
  const [madePost, setMadePost] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>(); // Use the correct type here

  const handleLogout = async () => {
    console.log("logging out");
    await AsyncStorage.removeItem("accessToken");
    setAccessToken('');
    navigation.navigate('login');
    setIsAuthenticated(false);
  };

  return (
    <LoginContext.Provider value={{madePost, setMadePost, commented, setCommented, addedEat, setAddedEat, followed, setFollowed, userName, setUserName, accessToken, setAccessToken, userId, setUserId, isAuthenticated, setIsAuthenticated, isLogin, setIsLogin, firstName, setFirstName, handleLogout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
