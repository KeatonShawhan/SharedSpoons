// contexts/LoginContext.tsx
import React, { createContext, useState } from 'react';

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
  isFollowed: (followed: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [followed, isFollowed] = useState<boolean>(true);


  return (
    <LoginContext.Provider value={{followed, isFollowed, userName, setUserName, accessToken, setAccessToken, userId, setUserId, isAuthenticated, setIsAuthenticated, isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
