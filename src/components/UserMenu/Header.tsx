// components/Header/Header.tsx
import styles from './Header.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAvatarIcon } from '../../utils/getImages.ts';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <div className={styles.logo}>Scheduler</div>
      </Link>
      <div className={styles.avatarWrapper} onClick={() => setIsOpen(!isOpen)}>
        <img src={getAvatarIcon()} alt="User" className={styles.avatar} />
        {isOpen && (
          <div className={styles.dropdown}>
            <Link to="/calendar">Календар</Link>
            <Link to="/user-account">Кабінет</Link>
            <button onClick={() => console.log('Logout')}>Вийти</button>
          </div>
        )}
      </div>

      <nav className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <Link to="/calendar">Календар</Link>
        <Link to="/user-account">Кабінет</Link>
      </nav>
    </header>
  );
};

export default Header;
