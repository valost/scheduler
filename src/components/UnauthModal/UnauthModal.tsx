import styles from './UnauthModal.module.scss';

type Props = {
  onClose: () => void;
  onAuthClick: () => void;
}

export const UnauthModal = ({ onClose, onAuthClick }: Props) => {
  const handleBackClick = () => {
    onClose();
  }

  return (
    <div className={styles.modal}>
      <div>
        <button onClick={handleBackClick} className={styles.buttonBack}>Назад</button>
      </div>

      <div className={styles.container}>
        <p className={styles.text}>Бронювання доступне тільки авторизованим користувачам</p>

        <button 
          className={styles.button}
          onClick={() => {
            console.log("Auth button clicked")
            onAuthClick()
          }}
        >
          Авторизація
        </button>
      </div>
    </div>
  )
}