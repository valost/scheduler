import styles from './CalendarPage.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useState } from 'react';
import { getArrowLeftIcon, getArrowRightIcon } from '../../utils/getImages';
import { bookings } from '../../utils/bookings';
import { Header } from '../../components/Header/Header';
// import { BookingModal } from '../../components/BookingModal/BookingModal';
import { UnauthModal } from '../../components/UnauthModal/UnauthModal';
import { SignUpModal } from '../../components/SignUpModal/SignUpModal';

dayjs.locale('uk');

export const CalendarPage = () => {
  const arrowLeftIcon = getArrowLeftIcon();
  const arrowRightIcon = getArrowRightIcon();
  const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const [selectedDay, setSelectedDay] = useState<number | null>(today.date());
  const [showNotification, setShowNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  
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

  const filteredBookings = selectedDay
    ? bookings.filter((booking) =>
        dayjs(booking.startTime).isSame(
          currentMonth.date(selectedDay),
          'day'
        )
      ).sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)))
    : [];

  const handlePrevMonthClick = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setSelectedDay(null);
  }

  const handleNextMonthClick = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    setSelectedDay(null);
  }

  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      setSelectedDay(day === selectedDay ? null : day);
    }
  };

  const handleBookClick = (event: React.MouseEvent) => {
    if (!selectedDay) {
      event.preventDefault();
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <Header />
      </div>

      <div className={styles.calendar}>
        <div className={styles.calendarTop}>
          <button className={styles.buttonArrow} onClick={handlePrevMonthClick}>
            <img src={arrowLeftIcon} className={styles.arrow}/>
          </button>

          <h3 className={styles.title}>{formattedDate}</h3>

          <button className={styles.buttonArrow} onClick={handleNextMonthClick}>
            <img src={arrowRightIcon} className={styles.arrow}/>
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
                  day === dayjs().date() && 
                  currentMonth.isSame(dayjs(), 'month') && 
                  day !== selectedDay 
                    ? styles.currentDay 
                    : ''
                } ${
                  hasBooking ? styles.hasBooking : ''
                } ${
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

      <div className={styles.wrapper}>
        <h3 className={styles.bookTitle}>Тренування</h3>

        {selectedDay ? (
          filteredBookings.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Час</th>
                  <th>Ім'я</th>
                </tr>
              </thead>
                
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{dayjs(booking.startTime).format('D/MM')}</td>
                    <td>{dayjs(booking.startTime).format('HH:mm')} - {dayjs(booking.endTime).format('HH:mm')}</td>
                    <td>{booking.userName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.book}>На обрану дату бронювання відсутні</p>
          )
        ) : (
          <p className={styles.book}>Оберіть день для перегляду бронювань</p>
        )}

        <button  
          className={`${styles.buttonBook} ${!selectedDay ? styles.disabled : ''}`}
          onClick={handleBookClick}
        >
          Забронювати корт
        </button>

        {showNotification && <p className={styles.notification}>Будь ласка оберіть дату бронювання</p>}
      </div>
      
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          {/* <BookingModal 
            selectedDay={selectedDay ? currentMonth.date(selectedDay).format('YYYY-MM-DD') : null}
            onClose={() => setIsModalOpen(false)}
          /> */}

          <UnauthModal 
            onClose={() => setIsModalOpen(false)}
            onAuthClick={() => {
              setIsModalOpen(false);
              setIsSignUpModalOpen(true);
            }}
          />
        </div>
      )}

      {isSignUpModalOpen && (
        <div className={styles.modalOverlay}>
          <SignUpModal 
            onClose={() => setIsSignUpModalOpen(false)}
          />
        </div>
      )}
    </div>
  )
}