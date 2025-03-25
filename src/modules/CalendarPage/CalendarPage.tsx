import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// import { getArrowLeftIcon, getArrowRightIcon } from '../../utils/getImages';
import styles from './CalendarPage.module.scss';
import { useState } from 'react';

dayjs.locale('uk');

export const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  
  // const daysInMonth = displayed

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.buttonBack}>Назад</Link>

        <h2 className={styles.title}>Березень 2025</h2>

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

      <div className={styles.days}></div>
    </div>
  )
}