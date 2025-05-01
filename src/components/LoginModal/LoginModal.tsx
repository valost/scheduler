import styles from './LoginModal.module.scss';

type Props = {
  onBack: () => void;
}

export const LoginModal = ({ onBack }: Props) => {
  const handleBackClick = () => {
    onBack();
  };
  
  return (
    <div className={styles.modal}>
      <button onClick={handleBackClick}>
        Назад
      </button>
    </div>
  )
}