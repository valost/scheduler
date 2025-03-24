import { DateCalendar } from '@mui/x-date-pickers';
import styles from './CalendarPage.module.scss';

export const CalendarPage = () => {
  return (
    <div className={styles.page}>
      <DateCalendar/>
    </div>
  )
}