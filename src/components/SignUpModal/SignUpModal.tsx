import { Controller, useForm } from 'react-hook-form';
import styles from './SignUpModal.module.scss';
import { PHONE_REGEX } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import InputMask from 'react-input-mask';
// import InputMask from 'react-input-mask';

type Props = {
  onClose: () => void;
  onNotify: (message: string) => void;
};

type FormValues = {
  name: string;
  phone: string;
  password: string;
  repeatPassword: string;
};

export const SignUpModal = ({ onClose, onNotify }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phone: '+380',
      password: '',
      repeatPassword: '',
    },
  });

  const { registerUser, loading, error } = useAuth();

  const onSubmit = async (data: FormValues) => {
    const success = await registerUser(
      data.name,
      data.phone,
      data.password,
      data.repeatPassword
    );

    if (success) {
      onNotify('Ви успішно зареєстровані!');
      onClose();
    } else {
      onNotify(error || 'Щось пішло не так. Спробуйте ще раз.');
    }
  };

  const handleBackClick = () => {
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div>
        <button onClick={handleBackClick} className={styles.buttonBack}>
          Скасувати
        </button>
      </div>

      <div className={styles.container}>
        <h3 className={styles.title}>Авторизація</h3>

        <p className={styles.description}></p>

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
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="phone">
              Ваш номер телефону:
            </label>

            <div className={styles.inputWrapper}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Введіть ваш номер телефону',
                  validate: (value) =>
                    PHONE_REGEX.test(value) || 'Невірний формат номера',
                }}
                render={({ field }) => (
                  <InputMask
                    mask="+380(99)999-99-99"
                    // alwaysShowMask
                    maskChar="_"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {(inputProps: any) => (
                      <input {...inputProps} className={styles.input} />
                    )}
                  </InputMask>
                )}
              />
            </div>

            {errors.phone && <span>{errors.phone.message}</span>}
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
    </div>
  );
};
