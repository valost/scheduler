import styles from './UserBookings.module.scss';
import { Booking } from '../../types/Booking';
import dayjs from 'dayjs';
import { getDeleteIcon } from '../../utils/getImages';

type Props = {
  bookings: Booking[];
  formatCourtName: (courtId: string) => string;
  deleteBooking: (id: string) => void;
};

export const UserBookings = ({
  bookings,
  formatCourtName,
  deleteBooking,
}: Props) => {
  return (
    <ul className={styles.bookingList}>
      {bookings.map((booking) => (
        <li key={booking._id} className={styles.bookingItem}>
          <div className={styles.bookingInfo}>
            <span className={styles.text}>
              {dayjs(booking.startTime).format('D/MM')}
            </span>
            <span className={styles.text}>
              {dayjs(booking.startTime).format('HH:mm')} –{' '}
              {dayjs(booking.endTime).format('HH:mm')}
            </span>
            <span className={styles.text}>
              📍 {formatCourtName(booking.courtId)}
            </span>

            <button
              className={styles.deleteButton}
              onClick={() => deleteBooking(booking._id)}
            >
              <img className={styles.icon} src={getDeleteIcon()} alt="Delete" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
