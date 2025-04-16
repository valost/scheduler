import { Controller, useForm } from 'react-hook-form';
import styles from './SignUpModal.module.scss';
import { postData } from '../../utils/fetchData';
import { PHONE_REGEX } from '../../utils/constants';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { useState } from 'react';

type Props = {
  onClose: () => void;
  onNotify: (message: string) => void;
}

type FormValues = {
  name: string;
  phone: string;
}

export const SignUpModal = ({ onClose, onNotify }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await postData<{ message: string }>('/api/users', data);
      
      onNotify('Ви успішно авторизувались!');
      onClose();
    } catch (error) {
      onNotify('Щось пішло не так. Спробуйте ще раз.');
      console.error("Помилка при реєстрації", error);
      onClose();
    }
  }

  const handleBackClick = () => {
    onClose();
  }

  return (
    <div className={styles.modal}>
      <div>
        <button onClick={handleBackClick} className={styles.buttonBack}>Скасувати</button>
      </div>

      <div className={styles.container}>
        <h3 className={styles.title}>Авторизація</h3>

        <p className={styles.description}></p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <label 
              className={styles.inputLabel}
              htmlFor="name"
            >
              Ваше ім'я:
            </label>

            <div className={styles.inputWrapper}>
              <input 
                className={styles.input}
                type="text"
                id="name"
                {...register("name", {
                  required: "Будь ласка введіть ваше ім'я"
                })}
              />
            </div>
            
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>
          
          <div className={styles.inputContainer}>
            <label 
              className={styles.inputLabel}
              htmlFor="name"
            >
              Ваш номер телефону:
            </label>

            <div className={styles.inputWrapper}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{ 
                  required: "Введіть ваш номер телефону",
                  validate: (value) => PHONE_REGEX.test(value) || "Невірний формат номера",
              }}
                render={({ field }) => (
                  <input
                    {...field}
                    className={styles.input}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted)
                    }}
                    value={field.value || ''}
                  />
                )}
              />
            </div>
            
            {errors.phone && (
              <span>{errors.phone.message}</span>
            )}
          </div>
          
          <button 
            type="submit"
            className={styles.button}
          >
            Підтвердити
          </button>
        </form>
      </div>
    </div>
  )
}