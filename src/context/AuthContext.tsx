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
    repeatPassword: string,
  ) => Promise<boolean>;
  loading: boolean;
  error: string;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  registerUser: async () => false,
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

  const registerUser = useCallback(
    async (
      name: string,
      phone: string,
      password: string,
      repeatPassword: string,
    ): Promise<boolean> => {
      setLoading(true);
      setError('');

      if (name.trim() && phone) {
        const passwordValidation = validatePassword(password);

        if (!passwordValidation.isValid) {
          setError(passwordValidation.message);
          setLoading(false);

          return false;
        }

        if (password !== repeatPassword) {
          setError('Паролі не співпадають');
          setLoading(false);

          return false;
        }

        const payload = { name, phone, password, repeatPassword };

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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setUser,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
