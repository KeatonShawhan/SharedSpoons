import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "expo-router";
import { RootTabParamList } from '@/app/(tabs)/_layout';
import { StackNavigationProp } from "@react-navigation/stack";
import { jwtDecode } from 'jwt-decode'; 

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
  setUserName: (username: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  followed: boolean;
  setFollowed: (followed: boolean) => void;
  addedEat: number; 
  setAddedEat: (addedEat: number) => void;
  triggerToEatRefresh: () => void; 
  commented: boolean;
  setCommented: (commented: boolean) => void;
  madePost: boolean;
  setMadePost: (madePost: boolean) => void;
  firstName: string;
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
  const [userName, setUserName] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [followed, setFollowed] = useState<boolean>(true);
  const [commented, setCommented] = useState<boolean>(true);
  const [addedEat, setAddedEat] = useState<number>(0); 
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
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.id);
      setUserName(decoded.username);
      setFirstName(decoded.firstname);
      console.log("Decoded token:", decoded);
      setAccessToken(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
      handleLogout(); // Logout if token is invalid
    }
  };

  const triggerToEatRefresh = () => {
    setAddedEat((prev) => prev + 1); // Increment counter for updates
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setAccessToken('');
    navigation.navigate('login'); // Redirect to login page
    setIsAuthenticated(false);
  };

  return (
    <LoginContext.Provider
      value={{
        madePost,
        setMadePost,
        commented,
        setCommented,
        addedEat,
        setAddedEat,
        triggerToEatRefresh,
        followed,
        setFollowed,
        userName,
        setUserName,
        accessToken,
        setAccessToken,
        userId,
        setUserId,
        isAuthenticated,
        setIsAuthenticated,
        firstName,
        setFirstName,
        handleLogout,
        decodeToken,
        isInitialized,
        setIsInitialized,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
