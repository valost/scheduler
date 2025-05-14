import { useForm } from 'react-hook-form';
import styles from './RegisterPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import { PHONE_REGEX } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type FormValues = {
  name: string;
  phone: string;
  password: string;
  repeatPassword: string;
};

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phone: '',
      password: '',
      repeatPassword: '',
    },
  });

  const { registerUser, error } = useAuth();
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const preparedPhone = `+380${data.phone}`;
    const success = await registerUser(data.name, preparedPhone, data.password);

    if (success) {
      setIsSuccess(true);
      setNotification('Ви успішно зареєструвались!');
    } else {
      setIsSuccess(false);
      setNotification(error || 'Щось пішло не так. Спробуйте ще раз.');
      reset();
    }
  };

  const handleCancelClick = () => {
    reset();
    navigate('/');
  };

  return (
    <div className={styles.page}>
      {!isSuccess && !notification && (
        <div className={styles.container}>
          <h3 className={styles.title}>Реєстрація</h3>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="name">
                Ваше ім'я:
              </label>

              <div className={styles.inputWrapper}>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  {...register('name', {
                    required: "Будь ласка введіть ваше ім'я",
                  })}
                />
              </div>

              {errors.name && (
                <span className={styles.errorMessage}>
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="phone">
                Ваш номер телефону:
              </label>

              <div className={styles.input}>
                <span className={styles.span}>+380</span>
                <input
                  className={styles.phoneInput}
                  type="tel"
                  id="phone"
                  maxLength={9}
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
                  validate: (value) =>
                    value.length >= 6 || 'Пароль має бути щонайменше 6 символів довжиною',
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

            <div className={styles.buttonContainerBottom}>
              <button type="submit" className={styles.button}>
                Підтвердити
              </button>

              <button
                onClick={handleCancelClick}
                className={styles.buttonCancel}
              >
                Скасувати
              </button>
            </div>
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
                navigate('/register');
              }}
            >
              Зареєструватися
            </button>
          )}
        </>
      )}
    </div>
  );
};
