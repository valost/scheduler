import { useNavigate } from 'react-router-dom';
import styles from './UnauthModal.module.scss';

type Props = {
  onClose: () => void;
};

export const UnauthModal = ({ onClose }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.modal}>
      <div>
        <button onClick={() => onClose()} className={styles.buttonBack}>
          Назад
        </button>
      </div>

      <div className={styles.container}>
        <p className={styles.text}>
          Щоб керувати бронюваннями, увійдіть до системи.
        </p>

        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={() => navigate('/login')}
          >
            Увійти
          </button>

          <button
            className={styles.button}
            onClick={() => navigate('register')}
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>
  );
};
