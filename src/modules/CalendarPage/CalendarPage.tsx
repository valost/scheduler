import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// import { getArrowLeftIcon, getArrowRightIcon } from '../../utils/getImages';
import styles from './CalendarPage.module.scss';
import { useState } from 'react';

dayjs.locale('uk');

export const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  
  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf('month').day();
  const firstDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarDays = [
    ...Array(firstDayOffset).fill(null),
    ...daysArray
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.buttonBack}>Назад</Link>

        <h2 className={styles.title}>{currentMonth.format('MMMM YYYY')}</h2>

        <button className={styles.button}>Тиждень</button>
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
        {calendarDays.map((day, index) => (
            <div 
              key={index}
              className={`${styles.day} ${
                day === null ? styles.empty :
                index % 7 === 5 || index % 7 === 6 ? styles.weekendTile : 
                styles.workdayTile
              } ${
                day === dayjs().date() && currentMonth.isSame(dayjs(), 'month') ? 
                styles.currentDay : ''
              }`}
            >
              {day || ''}
            </div>
          ))}
      </div>
    </div>
  )
}