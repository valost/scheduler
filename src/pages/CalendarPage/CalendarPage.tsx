import styles from './CalendarPage.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useState } from 'react';
import { UnauthModal } from '../../components/UnauthModal/UnauthModal.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { BookingModal } from '../../components/BookingModal/BookingModal.tsx';
import { bookings } from '../../utils/bookings.ts';
import Calendar from '../../components/Calendar/Calendar.tsx';
import BookingsTable from '../../components/BookingsTable/BookingsTable.tsx';
import { ModalType } from '../../types/ModalType.ts';
import { useParams } from 'react-router-dom';
import { locations } from '../../utils/locations.ts';

dayjs.locale('uk');

export const CalendarPage = () => {
  const { user } = useAuth();
  const { locationId } = useParams();
  const [selectedDay, setSelectedDay] = useState<number | null>(dayjs().date());
  const [modal, setModal] = useState<ModalType>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null,
  );

  const location = locations.find((loc) => loc._id === locationId)!;

  const handleBookClick = (event: React.MouseEvent) => {
    if (!selectedDay) {
      event.preventDefault();
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    } else {
      setModal(user ? 'booking' : 'unauth');
    }
  };

  const allBookings = bookings.filter(
    (booking) => booking.courtId === locationId
  );

  const filteredBookings = selectedDay
  ? allBookings
      .filter((booking) =>
        dayjs(booking.startTime).isSame(dayjs().date(selectedDay), 'day'),
      )
      .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)))
  : [];

  return (
    <div className={styles.page}>
      <Calendar 
        selectedDay={selectedDay!} 
        setSelectedDay={setSelectedDay} 
        bookings={allBookings}
      />

      <div className={styles.wrapper}>
        <h3 className={styles.bookTitle}>📍 {location.name}</h3>

        {selectedDay ? (
          <BookingsTable bookings={filteredBookings} />
        ) : (
          <p className={styles.book}>Оберіть день для перегляду бронювань</p>
        )}

        <button
          className={`${styles.buttonBook} ${!selectedDay ? styles.disabled : ''}`}
          onClick={handleBookClick}
        >
          Забронювати корт
        </button>

        {showNotification && (
          <p className={styles.notification}>
            Будь ласка оберіть дату бронювання
          </p>
        )}
      </div>

      {modal === 'booking' && user && (
        <div className={styles.modalOverlay}>
          <BookingModal
            selectedDay={
              selectedDay
                ? dayjs().date(selectedDay).format('YYYY-MM-DD')
                : null
            }
            onClose={() => setModal(null)}
          />
        </div>
      )}

      {modal === 'unauth' && (
        <div className={styles.modalOverlay}>
          <UnauthModal
            onClose={() => setModal(null)}
          />
        </div>
      )}
    </div>
  );
};
