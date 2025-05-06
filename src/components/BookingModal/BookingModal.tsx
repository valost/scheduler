import styles from './BookingModal.module.scss';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { TimePickDropdown } from '../TimePickDropdown/TimePickDropdown';
import { Booking, CreateBooking } from '../../types/Booking';
import { getData, postData } from '../../utils/fetchData';
import { shouldDisableEndTime, shouldDisableStartTime } from '../../utils/timeFunctions';

type Props = {
  userName: string;
  userId: string;
  courtId: string;
  selectedDay: Dayjs;
  onClose: () => void;
  onBookingSuccess?: () => void;
};

export const BookingModal = ({ 
  userName,
  userId,
  courtId,
  selectedDay, 
  onClose,
  onBookingSuccess 
}: Props) => {
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  // const [availableStartTimes, setAvailableStartTimes] = useState<Dayjs[]>([]);
  // const [availableEndTimes, setAvailableEndTimes] = useState<Dayjs[]>([]);

  console.log(bookings, error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData<Booking[]>(
          `/api/bookings?courtId=${courtId}&date=${selectedDay}`
        );
        setBookings(response);
      } catch (err) {
        setError('Не вдалося завантажити бронювання');
      }
    }

    fetchData();
  }, [courtId, selectedDay])

  // useEffect(() => {
  //   if (!startTime) {
  //     setAvailableEndTimes(getAvailableTimes(bookings, selectedDay).endTimes);
  //     return;
  //   }

  //   const filteredEndTimes = getAvailableTimes(bookings, selectedDay).endTimes.filter((time) =>
  //     time.isAfter(startTime)
  //   );
    
  //   setAvailableEndTimes(filteredEndTimes);

  //   if (endTime && !filteredEndTimes.some((time) => time.isSame(endTime))) {
  //     setEndTime(null);
  //   }
  // }, [startTime, bookings, selectedDay]);

  const bookCourt = async (booking: CreateBooking) => {
    try {
      const response = await postData<Booking>('/api/bookings', booking);

      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Не вдалося забронювати корт')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!startTime || !endTime) {
      setError('Будь ласка оберіть час бронювання');
      return;
    }

    try {
      const startDateTime = dayjs(selectedDay)
        .set('hour', startTime.hour())
        .set('minute', startTime.minute())
        .set('second', 0)
        .toISOString();

      const endDateTime = dayjs(selectedDay)
        .set('hour', endTime.hour())
        .set('minute', endTime.minute())
        .set('second', 0)
        .toISOString();

      const booking: CreateBooking = {
        userName,
        userId,
        courtId,
        startTime: startDateTime,
        endTime: endDateTime,
      }

      console.log(booking);

      await bookCourt(booking);

      setError(null);
      setStartTime(null);
      setEndTime(null);

      if (onBookingSuccess) onBookingSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося забронювати корт');
    }
  }
  
  const handleBackClick = () => {
    setStartTime(null);
    setEndTime(null);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div>
        <button onClick={handleBackClick} className={styles.buttonBack}>
          Назад
        </button>
      </div>

      <div className={styles.container}>
        <h3 className={styles.title}>Бронювання</h3>

        <p className={styles.description}>
          Забронювати корт на {dayjs(selectedDay).format('D MMMM YYYY')}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <TimePickDropdown 
            label="Початок тренування:"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
              setEndTime(null);
            }}
            shouldDisableTime={(value, view) => shouldDisableStartTime(value, view)}
          />

          <TimePickDropdown 
            label="Кінець тренування:"
            value={endTime}
            onChange={setEndTime}
            disabled={!startTime}
            shouldDisableTime={(value, view) => shouldDisableEndTime(value, view, startTime)}
          />

          <button className={styles.button} disabled={!startTime && !endTime}>
            Підтвердити
          </button>
        </form>
      </div>
    </div>
  );
};
