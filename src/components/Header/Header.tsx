import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAvatarIcon,
  getCloseMenuIcon,
  getLoginIcon,
} from '../../utils/getImages.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { AsideMenu } from '../AsideMenu/AsideMenu.tsx';

const Header = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuVisibility = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  const menuOverflowStatus = (menuVisibility: boolean) => {
    if (menuVisibility) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    menuOverflowStatus(isOpen);
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <div className={styles.logo}>Scheduler</div>
      </Link>

      <Link
        to="/"
        className={styles.avatarWrapper}
        onClick={handleMenuVisibility}
      >
        {user ? (
          <img src={getAvatarIcon()} alt="User" className={styles.avatar} />
        ) : isOpen ? (
          <img
            src={getCloseMenuIcon()}
            alt="Close menu"
            className={styles.icon}
          />
        ) : (
          <img src={getLoginIcon()} alt="Login" className={styles.icon} />
        )}
      </Link>

      <AsideMenu
        isOpen={isOpen}
        handleMenuVisibility={handleMenuVisibility}
        user={!!user}
      />
    </header>
  );
};

export default Header;
