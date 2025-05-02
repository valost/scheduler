import { useForm } from 'react-hook-form';
import styles from './LoginModal.module.scss';
import { PHONE_REGEX } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

type Props = {
  onBack: () => void;
  onClose: () => void;
  onNotify: (message: string) => void;
}

type FormValues = {
  phone: string;
  password: string;
};

export const LoginModal = ({ onBack, onClose, onNotify }: Props) => {
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

  const onSubmit = async (data: FormValues) => {
    const preparedPhone = `+380${data.phone}`;
    
    const success = await loginUser(
      preparedPhone,
      data.password,
    );

    if (success) {
      onClose();
    } else {
      onNotify(error || 'Щось пішло не так. Спробуйте ще раз.')
    }
  };
  
  const handleBackClick = () => {
    reset();
    onBack();
  };
  
  return (
    <div className={styles.modal}>
      <div className={styles.buttonContainerTop}>
        <button onClick={handleBackClick} className={styles.buttonBack}>
          Назад
        </button>
      </div>

      <div className={styles.container}>
        <h3 className={styles.title}>Авторизація</h3>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="phone">
              Номер телефону:
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
      </div>
    </div>
  )
}