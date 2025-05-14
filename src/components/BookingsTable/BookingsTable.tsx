import dayjs from 'dayjs';
import { Booking } from '../../types/Booking';
import styles from './BookingsTable.module.scss';
import { User } from '../../types/User';

type Props = {
  bookings: Booking[];
  user: User | null;
};

const BookingsTable = ({ bookings, user }: Props) => {
  const now = dayjs();

  return (
    <>
      {bookings.length > 0 ? (
        <ul className={styles.bookingList}>
          {bookings.map((booking) => {
            const isPast = dayjs(booking.startTime).isBefore(now, 'minute');

            return (
              <li
                key={booking._id}
                className={`${styles.bookingItem} 
                  ${booking.userId === user?.id ? styles.isUser : ''}
                  ${isPast ? styles.isPast : ''}
                `}
              >
                <div className={styles.bookingInfo}>
                  <span className={styles.text}>
                    {dayjs(booking.startTime).format('D/MM')}
                  </span>
                  <span className={styles.text}>
                    {dayjs(booking.startTime).format('HH:mm')} –{' '}
                    {dayjs(booking.endTime).format('HH:mm')}
                  </span>
                  <span className={styles.text}>{booking.userName}</span>
                </div>
              </li>
            )  
          })}
        </ul>
      ) : (
        <p className={styles.bookingEmpty}>На цю дату бронювання відсутні</p>
      )}
    </>
  );
};

export default BookingsTable;
