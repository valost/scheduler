import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.scss';
import { PHONE_REGEX } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

type FormValues = {
  phone: string;
  password: string;
};

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const { loginUser, error } = useAuth();
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const onSubmit = async (data: FormValues) => {
    const preparedPhone = `+380${data.phone}`;

    const success = await loginUser(preparedPhone, data.password);

    if (success) {
      navigate('/');
    } else {
      reset();
      setNotification(error || 'Щось пішло не так. Спробуйте ще раз');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <h3 className={styles.title}>Авторизація</h3>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="phone">
              Номер телефону:
            </label>

            <div className={styles.phoneInputBig}>
              <span className={styles.span}>+380</span>
              <input
                className={styles.phoneInputSmall}
                type="tel"
                id="phone"
                maxLength={9}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                    e.preventDefault();
                  }
                }}
                {...register('phone', {
                  required: 'Будь ласка, введіть номер телефону',
                  validate: (value) =>
                    PHONE_REGEX.test(value) || 'Номер має містити 9 цифр',
                })}
              />
            </div>

            {errors.phone && (
              <span className={styles.errorMessage}>
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="password">
              Пароль:
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              {...register('password', {
                required: 'Будь ласка, введіть пароль',
              })}
            />

            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button type="submit" className={styles.button}>
            Підтвердити
          </button>
        </form>

        <Link to='/reset-pass' className={styles.link}>Я не пам'ятаю свій пароль</Link>

        {notification && (
          <div className={styles.notification}>{notification}</div>
        )}
      </div>
    </div>
  );
};
