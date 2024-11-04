// contexts/LoginContext.tsx
import React, { createContext, useState } from 'react';

interface LoginContextType {
  accessToken: string;
  setAccessToken: (token: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');


  return (
    <LoginContext.Provider value={{ accessToken, setAccessToken, userId, setUserId }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
