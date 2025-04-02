import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <Link to='/' className={styles.buttonBack}>Назад</Link>
        
        <Link to="/user-account" className={styles.buttonUser}>Мій кабінет</Link>
      </div>
    </div>
  )
}