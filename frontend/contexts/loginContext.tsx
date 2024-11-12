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
  setFollowed: (followed: boolean) => void;
  addedEat:boolean;
  setAddedEat: (followed: boolean) => void;
  commented:boolean;
  setCommented: (followed: boolean) => void;
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



  return (
    <LoginContext.Provider value={{commented, setCommented, addedEat, setAddedEat, followed, setFollowed, userName, setUserName, accessToken, setAccessToken, userId, setUserId, isAuthenticated, setIsAuthenticated, isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
