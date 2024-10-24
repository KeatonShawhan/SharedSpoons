import React, { createContext, useState, ReactNode } from "react";

interface ProfileContextProps {
  name: string;
  setName: (name: string) => void;
}

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileContext = createContext<ProfileContextProps>({
  name: '',
  setName: () => {},
});

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [name, setName] = useState<string>("Nico Vitagliano");

  return (
    <ProfileContext.Provider value={{ name, setName }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextProps => {
  const context = React.useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
