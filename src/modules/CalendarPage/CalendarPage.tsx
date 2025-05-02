import styles from './CalendarPage.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useState } from 'react';
import { UnauthModal } from '../../components/UnauthModal/UnauthModal';
import { SignUpModal } from '../../components/SignUpModal/SignUpModal';
import { NotificationModal } from '../../components/NotificationModal/NotificationModal';
import { LoginModal } from '../../components/LoginModal/LoginModal';
import { useAuth } from '../../context/AuthContext';
import { BookingModal } from '../../components/BookingModal/BookingModal';
import { bookings } from '../../utils/bookings.ts';
import Calendar from './Calendar/Calendar.tsx';
import BookingsTable from './Bookings/BookingsTable.tsx';

dayjs.locale('uk');

type ModalType =
  | 'booking'
  | 'unauth'
  | 'signup'
  | 'login'
  | 'notification'
  | null;

export const CalendarPage = () => {
  const { user } = useAuth();

  const [selectedDay, setSelectedDay] = useState<number | null>();

  const [modal, setModal] = useState<ModalType>(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null,
  );

  const handleBookClick = (event: React.MouseEvent) => {
    if (!selectedDay) {
      event.preventDefault();
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    } else {
      setModal(user ? 'booking' : 'unauth');
    }
  };

  const filteredBookings = selectedDay
    ? bookings
        .filter((booking) =>
          dayjs(booking.startTime).isSame(dayjs().date(selectedDay), 'day'),
        )
        .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)))
    : [];

  return (
    <div className={styles.page}>
      <Calendar selectedDay={selectedDay!} setSelectedDay={setSelectedDay} />

      <div className={styles.wrapper}>
        <h3 className={styles.bookTitle}>Бронювання</h3>

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
            onSignupClick={() => setModal('signup')}
            onLoginClick={() => setModal('login')}
          />
        </div>
      )}

      {modal === 'signup' && (
        <div className={styles.modalOverlay}>
          <SignUpModal
            onNotify={(message) => {
              setModal('notification');
              setNotificationMessage(message);
            }}
            onClose={() => setModal(null)}
            onBack={() => setModal('unauth')}
          />
        </div>
      )}

      {modal === 'login' && (
        <div className={styles.modalOverlay}>
          <LoginModal onBack={() => setModal('unauth')} />
        </div>
      )}

      {modal === 'notification' && notificationMessage && (
        <div className={styles.modalOverlay}>
          <NotificationModal
            message={notificationMessage}
            onClose={() => {
              setModal(null);
              setNotificationMessage(null);
            }}
          />
        </div>
      )}
    </div>
  );
};
