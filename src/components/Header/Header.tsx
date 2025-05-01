import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useAuth } from '../../context/AuthContext';
import { UnauthModal } from '../UnauthModal/UnauthModal';

type Props = {
  modal: 'booking' | 'unauth' | 'signup' | 'login' | 'notification' | null;
  setModal: React.Dispatch<React.SetStateAction<Props['modal']>>;
}

export const Header = ({ modal, setModal }: Props) => {
  const { user } = useAuth();

  const handleAuthButtonClick = () => {
    setModal('unauth');
  };
  
  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <Link to="/" className={styles.buttonBack}>
          Назад
        </Link>

        {user ? (
          <Link to="/user-account" className={styles.buttonUser}>
            Мій кабінет
          </Link>
        ) : (
          <button onClick={handleAuthButtonClick} className={styles.buttonUser}>
            Увійти
          </button>
        )}
        
        {modal === 'unauth' && (
          <div className={styles.modalOverlay}>
            <UnauthModal 
              onClose={() => setModal(null)}
              onSignupClick={() => setModal('signup')}
              onLoginClick={() => setModal('login')}
            />
          </div>
        )}
      </div>
    </div>
  );
};
