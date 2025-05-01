import styles from './LoginModal.module.scss';

type Props = {
  onClose: () => void;
}

export const LoginModal = ({ onClose }: Props) => {
  return (
    <div className={styles.modal}></div>
  )
}