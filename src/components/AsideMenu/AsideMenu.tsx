import { Link, NavLink } from 'react-router-dom';
import styles from './AsideMenu.module.scss';
import classNames from 'classnames';
import { useAuth } from '../../context/AuthContext';

type Props = {
  isOpen: boolean;
  handleMenuVisibility: () => void;
  user: boolean;
};

export const AsideMenu = ({ isOpen, handleMenuVisibility, user }: Props) => {
  const { logoutUser } = useAuth();

  return (
    <aside
      className={classNames(styles.aside, {
        [styles.menuOpened]: isOpen,
      })}
    >
      <div className={styles.menu}>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            onClick={handleMenuVisibility}
            className={styles.navItem}
          >
            Корти
          </NavLink>

          {/* <NavLink
            to="/calendar"
            onClick={handleMenuVisibility}
            className={styles.navItem}
          >
            Календар
          </NavLink> */}

          {user && (
            <>
              <NavLink
                to="/user-account"
                onClick={handleMenuVisibility}
                className={styles.navItem}
              >
                Мої бронювання
              </NavLink>

              <button className={styles.button} onClick={() => logoutUser()}>
                Вийти
              </button>
            </>
          )}
        </nav>

        {!user && (
          <div className={styles.buttonWrapper}>
            <Link
              to="/login"
              className={styles.button}
              onClick={handleMenuVisibility}
            >
              Увійти
            </Link>

            <Link
              to="/register"
              className={styles.button}
              onClick={handleMenuVisibility}
            >
              Зареєструватися
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};
