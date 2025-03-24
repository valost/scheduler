import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Outlet />
    </div>
  )
}

export default App;
