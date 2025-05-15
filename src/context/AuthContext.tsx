import { createContext, useContext, useState } from 'react';
import { User } from '../types/User';
import { useLocalStorage } from '../utils/useLocalStorage';
import {
  registerUserService,
  loginUserService,
  logoutUserService,
} from '../utils/authServices';

type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  registerUser: (
    name: string,
    phone: string,
    password: string,
  ) => Promise<boolean>;
  loading: boolean;
  error: string;
  setUser: (user: User | null) => void;
  loginUser: (phone: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  registerUser: async () => false,
  loginUser: async () => false,
  logoutUser: () => {},
  loading: false,
  error: '',
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const registerUser = (name: string, phone: string, password: string) => {
    return registerUserService(name, phone, password, setLoading, setError);
  };

  const loginUser = (phone: string, password: string) => {
    return loginUserService(phone, password, setUser, setLoading, setError);
  };

  const logoutUser = () => {
    logoutUserService(setUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
