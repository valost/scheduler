import styles from './NotificationModal.module.scss';

type Props = {
  message: string;
  onClose: () => void;
};

export const NotificationModal = ({ message, onClose }: Props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <p className={styles.text}>{message}</p>

        <button className={styles.button} onClick={() => onClose()}>
          До календаря
        </button>
      </div>
    </div>
  );
};
