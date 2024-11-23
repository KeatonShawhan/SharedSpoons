// loginContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { RootTabParamList } from '@/app/(tabs)/_layout';
import { StackNavigationProp } from '@react-navigation/stack';
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
  triggerToEatRefresh: (postId: string, isSaved: boolean) => void;
  commented: boolean;
  setCommented: (commented: boolean) => void;
  liked: boolean;
  setLiked: (liked: boolean) => void;
  madePost: boolean;
  setMadePost: (madePost: boolean) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  handleLogout: () => void;
  decodeToken: () => void;
  isInitialized: boolean;
  setIsInitialized: (isInitialized: boolean) => void;
  savedPostData: { postId: string; isSaved: boolean } | null; // New state for saved post info
  lastUser: string;
  setLastUser: (userId: string) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [followed, setFollowed] = useState<boolean>(true);
  const [commented, setCommented] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(true);
  const [addedEat, setAddedEat] = useState<number>(0);
  const [madePost, setMadePost] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [lastUser, setLastUser] = useState<string>('');

  // New state to store specific post save status updates
  const [savedPostData, setSavedPostData] = useState<{ postId: string; isSaved: boolean } | null>(
    null
  );

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
      console.log('Decoded token:', decoded);
      setAccessToken(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      handleLogout(); // Logout if token is invalid
    }
  };

  const triggerToEatRefresh = (postId: string, isSaved: boolean) => {
    console.log('triggerToEatRefresh called for postId:', postId, 'isSaved:', isSaved);
    setAddedEat((prev) => prev + 1); // This can remain for other uses
    setSavedPostData({ postId, isSaved }); // Store the updated post info
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    setAccessToken('');
    navigation.navigate('login');
    setIsAuthenticated(false);
    setLastUser(userId);
  };

  return (
    <LoginContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userId,
        setUserId,
        userName,
        setUserName,
        isAuthenticated,
        setIsAuthenticated,
        followed,
        setFollowed,
        addedEat,
        setAddedEat,
        triggerToEatRefresh,
        commented,
        setCommented,
        liked,
        setLiked,
        madePost,
        setMadePost,
        firstName,
        setFirstName,
        handleLogout,
        decodeToken,
        isInitialized,
        setIsInitialized,
        savedPostData,
        lastUser,
        setLastUser
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
