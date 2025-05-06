import styles from './CalendarPage.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useEffect, useState } from 'react';
import { UnauthModal } from '../../components/UnauthModal/UnauthModal.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { BookingModal } from '../../components/BookingModal/BookingModal.tsx';
import Calendar from '../../components/Calendar/Calendar.tsx';
import BookingsTable from '../../components/BookingsTable/BookingsTable.tsx';
import { ModalType } from '../../types/ModalType.ts';
import { useParams } from 'react-router-dom';
import { locations } from '../../utils/locations.ts';
import { Booking } from '../../types/Booking.ts';
import { getData } from '../../utils/fetchData.ts';

dayjs.locale('uk');

export const CalendarPage = () => {
  const { user } = useAuth();
  const { locationId } = useParams<{ locationId: string }>();
  const [selectedDay, setSelectedDay] = useState<number | null>(dayjs().date());
  const [modal, setModal] = useState<ModalType>(null);
  const [showNotification, setShowNotification] = useState(false);
  // const [notificationMessage, setNotificationMessage] = useState<string | null>(
  //   null,
  // );
  const [bookings, setBookings] = useState<Booking[]>([]);

  const location = locations.find((loc) => loc._id === locationId);

  if (!location || !locationId) {
    return <div className={styles.error}>Invalid location</div>;
  }

  console.log(selectedDay);

  const fetchBookings = async () => {
    try {
      const data = await getData<Booking[]>('/api/bookings');

      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [locationId]);

  const handleBookingSuccess = async () => {
    await fetchBookings();
    setModal(null);
    setSelectedDay(dayjs().date());
  };

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
      .filter((booking) => {
        // Compare the day part of the start time (date only) with selectedDay
        return dayjs(booking.startTime).isSame(dayjs().date(selectedDay), 'day');
      })
      .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime))) // Sort by time
  : [];


  console.log(filteredBookings);

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

        {showNotification && (
          <p className={styles.notification}>
            Будь ласка оберіть дату бронювання
          </p>
        )}
      </div>

      {modal === 'booking' && typeof selectedDay === 'number' && user && (
        <div className={styles.modalOverlay}>
          <BookingModal
            userName={user.name}
            userId={user.id}
            courtId={locationId}
            selectedDay={dayjs().date(selectedDay)}
            onClose={() => setModal(null)}
            onBookingSuccess={handleBookingSuccess}
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

      <button
        className={`${styles.buttonBook} ${!selectedDay ? styles.disabled : ''}`}
        onClick={handleBookClick}
      >
        Забронювати корт
      </button>
    </div>
  );
};
