import { createContext, useCallback, useContext, useState } from 'react';
import { User } from '../types/User';
import { useLocalStorage } from '../utils/useLocalStorage';
import { validatePassword } from '../utils/validatePassword';
import { postData } from '../utils/fetchData';

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

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log(user);

  const registerUser = useCallback(
    async (name: string, phone: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError('');

      if (name.trim() && phone) {
        const passwordValidation = validatePassword(password);

        if (!passwordValidation.isValid) {
          setError(passwordValidation.message);
          setLoading(false);

          return false;
        }

        const payload = { name, phone, password };

        try {
          await postData('/api/users', payload);
          setError('');

          return true;
        } catch (error) {
          const err = error as Error;

          if (err.message.includes('409')) {
            setError('Цей номер вже зареєстрований');
          } else {
            setError('Щось пішло не так. Спробуйте ще раз');
          }

          return false;
        } finally {
          setLoading(false);
        }
      } else {
        setError('Будь ласка, правильно заповніть усі поля');
        setLoading(false);

        return false;
      }
    },
    [setLoading, setError],
  );

  const loginUser = useCallback(
    async (phone: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError('');

      const payload = { phone, password };

      try {
        const response = await postData<{
          token: string;
          user: User;
        }>('/api/login', payload);

        localStorage.setItem('token', response.token);
        setUser(response.user);
        setError('');

        return true;
      } catch (error) {
        const err = error as Error;

        if (err.message.includes('401')) {
          setError('Неправильний пароль');
        } else if (err.message.includes('404')) {
          setError('Користувач не знайден');
        } else {
          setError('Щось пішло не так. Спробуйте ще раз');
        }

        return false;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setUser],
  );

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
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
