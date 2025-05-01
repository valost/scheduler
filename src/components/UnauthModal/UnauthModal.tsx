import styles from './UnauthModal.module.scss';

type Props = {
  onClose: () => void;
  onSignupClick: () => void;
  onLoginClick: () => void;
};

export const UnauthModal = ({ onClose, onSignupClick, onLoginClick }: Props) => {
  const handleBackClick = () => {
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div>
        <button onClick={handleBackClick} className={styles.buttonBack}>
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
            onClick={() => {
              console.log('Auth button clicked');
              onLoginClick();
            }}
          >
            Увійти
          </button>

          <button
            className={styles.button}
            onClick={() => {
              console.log('Auth button clicked');
              onSignupClick();
            }}
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>
  );
};
