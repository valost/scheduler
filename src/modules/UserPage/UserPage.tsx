// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserPage.module.scss';
import { useAuth } from '../../context/AuthContext';

export const UserPage = () => {
  // const [bookings, setBookings] = useState([]);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/calendar');
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/calendar" className={styles.buttonBack}>
          Назад
        </Link>

        <button onClick={handleLogout} className={styles.buttonExit}>Вихід</button>
      </div>

      <div className={styles.wrapper}>
        <h3 className={styles.title}>Мої бронювання</h3>

        <h3>{`Привіт, ${user?.name}!`}</h3>

        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Час</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
