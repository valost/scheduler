import { Header } from '../../components/Header/Header';
import styles from './BookingPage.module.scss';

export const BookingPage = () => {
  return (
    <div className={styles.page}>
      <Header backLink="/calendar"/>
    </div>
  )
}