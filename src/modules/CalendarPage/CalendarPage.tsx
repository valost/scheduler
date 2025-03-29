import styles from './CalendarPage.module.scss';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useState } from 'react';
import { getArrowLeftIcon, getArrowRightIcon } from '../../utils/getImages';
import { bookings } from '../../utils/bookings';
import { Booking } from '../../types/Booking';

dayjs.locale('uk');

export const CalendarPage = () => {
  const arrowLeftIcon = getArrowLeftIcon();
  const arrowRightIcon = getArrowRightIcon();
  const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const [selectedDay, setSelectedDay] = useState<number | null>(today.date());
  
  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf('month').day();
  const firstDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarDays = [
    ...Array(firstDayOffset).fill(null),
    ...daysArray
  ];
  const formattedDate = capitalizeFirstChar(currentMonth.format('MMMM YYYY'));

  const twoWeeksFromNow = today.add(14, 'day');

  const relevantBookings = bookings.filter((booking) => {
    const bookingDate = dayjs(booking.startTime);

    return (
      bookingDate.isSame(today, 'day') ||
      (bookingDate.isAfter(today) && bookingDate.isBefore(twoWeeksFromNow)) ||
      bookingDate.isSame(twoWeeksFromNow, 'day')
    );
  }).sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));

  const handlePrevMonthClick = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setSelectedDay(today.date());
  }

  const handleNextMonthClick = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    setSelectedDay(today.date());
  }

  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      setSelectedDay(day === selectedDay ? null : day);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Link to="/" className={styles.buttonBack}>Назад</Link>

          <button className={styles.button}>Тиждень</button>
        </div>

        <div className={styles.headerBottom}>
          <button className={styles.buttonArrow} onClick={handlePrevMonthClick}>
            <img src={arrowLeftIcon} className={styles.arrow}/>
          </button>

          <h3 className={styles.title}>{formattedDate}</h3>

          <button className={styles.buttonArrow} onClick={handleNextMonthClick}>
            <img src={arrowRightIcon} className={styles.arrow}/>
          </button>
        </div>
      </div>

      <div className={styles.weekdays}>
        <div className={styles.workday}>Пн</div>
        <div className={styles.workday}>Вт</div>
        <div className={styles.workday}>Ср</div>
        <div className={styles.workday}>Чт</div>
        <div className={styles.workday}>Пт</div>
        <div className={styles.weekend}>Сб</div>
        <div className={styles.weekend}>Нд</div>
      </div>

      <div className={styles.days}>
        {calendarDays.map((day, index) => {
          const hasBooking = day && relevantBookings.some(b => 
            dayjs(b.startTime).date() === day &&
            dayjs(b.startTime).isSame(currentMonth, 'month')
          );
          return (
            <div 
              key={index}
              className={`${styles.day} ${
                day === null ? styles.empty :
                index % 7 === 5 || index % 7 === 6 ? styles.weekendTile : 
                styles.workdayTile
              } ${
                day === dayjs().date() && currentMonth.isSame(dayjs(), 'month') ? 
                styles.currentDay : ''
              } ${hasBooking ? styles.hasBooking : ''} ${
                day === selectedDay ? styles.selectedDay : ''
              }`}
              onClick={() => handleDayClick(day)}
            >
              {day || ''}
            </div>
          );
        })}
      </div>

      <h3 className={styles.bookTitle}>Тренування</h3>

      <div className={styles.book}>
        {bookings.length > 0 ? (
          <ul className={styles.bookList}>
            {bookings.map(booking => (
            <li key={booking.id} className={styles.bookItem}>
              {dayjs(booking.startTime).format('D MMMM, HH:mm')} - 
              {dayjs(booking.endTime).format('HH:mm')} - {booking.userName}
            </li>
            ))}
          </ul>
        ) : (
          <p>Бронювання відсутні</p>
        )}
      </div>
    </div>
  )
}