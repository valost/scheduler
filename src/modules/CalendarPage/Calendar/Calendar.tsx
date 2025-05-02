import styles from '../CalendarPage.module.scss';
import dayjs from 'dayjs';
import {
  getArrowLeftIcon,
  getArrowRightIcon,
} from '../../../utils/getImages.ts';
import { useState } from 'react';
import { bookings } from '../../../utils/bookings.ts';

type Props = {
  selectedDay: number | null;
  setSelectedDay: (day: number | null) => void;
};

const Calendar = ({ selectedDay, setSelectedDay }: Props) => {
  const arrowLeftIcon = getArrowLeftIcon();
  const arrowRightIcon = getArrowRightIcon();

  // TODO: Move to global fiunctions / utils
  const capitalizeFirstChar = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf('month').day();
  const firstDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarDays = [...Array(firstDayOffset).fill(null), ...daysArray];
  const formattedDate = capitalizeFirstChar(currentMonth.format('MMMM YYYY'));

  const twoWeeksFromNow = today.add(14, 'day');

  const relevantBookings = bookings
    .filter((booking) => {
      const bookingDate = dayjs(booking.startTime);

      return (
        bookingDate.isSame(today, 'day') ||
        (bookingDate.isAfter(today) && bookingDate.isBefore(twoWeeksFromNow)) ||
        bookingDate.isSame(twoWeeksFromNow, 'day')
      );
    })
    .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));

  const handlePrevMonthClick = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setSelectedDay(null);
  };

  const handleNextMonthClick = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    setSelectedDay(null);
  };

  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      setSelectedDay(day === selectedDay ? null : day);
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarTop}>
        <button className={styles.buttonArrow} onClick={handlePrevMonthClick}>
          <img src={arrowLeftIcon} className={styles.arrow} />
        </button>

        <h3 className={styles.title}>{formattedDate}</h3>

        <button className={styles.buttonArrow} onClick={handleNextMonthClick}>
          <img src={arrowRightIcon} className={styles.arrow} />
        </button>
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
          const hasBooking =
            day &&
            relevantBookings.some(
              (b) =>
                dayjs(b.startTime).date() === day &&
                dayjs(b.startTime).isSame(currentMonth, 'month'),
            );
          return (
            <div
              key={index}
              className={`${styles.day} ${
                day === null
                  ? styles.empty
                  : index % 7 === 5 || index % 7 === 6
                    ? styles.weekendTile
                    : styles.workdayTile
              } ${
                day === dayjs().date() &&
                currentMonth.isSame(dayjs(), 'month') &&
                day !== selectedDay
                  ? styles.currentDay
                  : ''
              } ${hasBooking ? styles.hasBooking : ''} ${
                day === selectedDay && selectedDay !== null
                  ? styles.selectedDay
                  : ''
              }`}
              onClick={() => handleDayClick(day)}
            >
              {day || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
