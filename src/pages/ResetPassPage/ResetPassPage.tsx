import { useForm } from 'react-hook-form';
import styles from './ResetPassPage.module.scss';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PHONE_REGEX } from '../../utils/constants';

type FormValues = {
  phone: string;
  password: string;
  repeatPassword: string;
};

export const ResetPassPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      phone: '',
      password: '',
      repeatPassword: '',
    },
  });

  const { resetPassword, error } = useAuth();
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const preparedPhone = `+380${data.phone}`;
    const success = await resetPassword(preparedPhone, data.password);

    if (success) {
      setIsSuccess(true);
      setNotification('Пароль успішно змінений');
    } else {
      setIsSuccess(false);
      setNotification(error || 'Щось пішло не так. Спробуйте ще раз.');
      reset();
    }
  };

  return (
    <div className={styles.page}>
      {!isSuccess && !notification && (
        <div className={styles.container}>
          <h3 className={styles.title}>Зміна паролю</h3>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="phone">
                Твій номер телефону:
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
                Новий пароль:
              </label>
              <input
                className={styles.input}
                type="password"
                id="password"
                {...register('password', {
                  required: 'Будь ласка, введіть пароль',
                  validate: (value) =>
                    value.length >= 6 ||
                    'Пароль має бути щонайменше 6 символів довжиною',
                })}
              />

              {errors.password && (
                <span className={styles.errorMessage}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="repeatPassword">
                Повторіть пароль:
              </label>
              <input
                className={styles.input}
                type="password"
                id="repeatPassword"
                {...register('repeatPassword', {
                  required: 'Будь ласка, повторіть пароль',
                  validate: (value) =>
                    value === watch('password') || 'Паролі не співпадають',
                })}
              />

              {errors.repeatPassword && (
                <span className={styles.errorMessage}>
                  {errors.repeatPassword.message}
                </span>
              )}
            </div>

            <button type="submit" className={styles.button}>
              Підтвердити
            </button>
          </form>
        </div>
      )}

      {notification && (
        <>
          <div className={styles.notification}>{notification}</div>

          {isSuccess ? (
            <button
              className={styles.button}
              onClick={() => navigate('/login')}
            >
              Увійти
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={() => {
                setNotification('');
                navigate('/reset-pass');
              }}
            >
              Змінити пароль
            </button>
          )}
        </>
      )}
    </div>
  );
};
