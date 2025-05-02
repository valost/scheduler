import { Outlet } from 'react-router-dom';
import Header from '../../components/UserMenu/Header';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
