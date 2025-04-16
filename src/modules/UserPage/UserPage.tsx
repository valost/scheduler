// import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserPage.module.scss';

export const UserPage = () => {
  // const [bookings, setBookings] = useState([]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to='/calendar' className={styles.buttonBack}>Назад</Link>
      </div>
      
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Мої бронювання</h3>

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
  )
}