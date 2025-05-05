import dayjs from 'dayjs';
import { Booking } from '../../types/Booking';
import styles from './BookingsTable.module.scss';

type Props = {
  bookings: Booking[];
};

const BookingsTable = ({ bookings }: Props) => {
  return (
    <>
      {bookings.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Час</th>
              <th>Ім'я</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{dayjs(booking.startTime).format('D/MM')}</td>
                <td>
                  {dayjs(booking.startTime).format('HH:mm')} -{' '}
                  {dayjs(booking.endTime).format('HH:mm')}
                </td>
                <td>{booking.userName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.book}>Бронювання відсутні</p>
      )}
    </>
  );
};

export default BookingsTable;
