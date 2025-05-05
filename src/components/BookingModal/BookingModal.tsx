import styles from './BookingModal.module.scss';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { TimePickDropdown } from '../TimePickDropdown/TimePickDropdown';

type Props = {
  selectedDay: string | null;
  onClose: () => void;
};

export const BookingModal = ({ selectedDay, onClose }: Props) => {
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  // const generateTimeOptions = () => {
  //   const options = [];
  //   let time = dayjs(selectedDay).hour(5).minute(0).startOf('minute');
  //   const closingTime = dayjs(selectedDay).hour(22).minute(0).startOf('minute');

  //   while (time.isBefore(closingTime) || time.isSame(closingTime)) {
  //     const formattedTime = time.format('HH:mm');
  //     options.push(formattedTime);
  //     time = time.add(30, 'minute');
  //   }

  //   return options;
  // };

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

        <form className={styles.form}>
          <TimePickDropdown 
            label="Початок тренування:"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
              setEndTime(null);
            }}
            shouldDisableTime={(value, view) => {
              if (view === 'minutes') {
                return value.minute() % 30 !== 0;
              }

              const hour = value.hour();
              return hour < 5 || hour >= 22;
            }}
          />

          <TimePickDropdown 
            label="Кінець тренування:"
            value={endTime}
            onChange={setEndTime}
            disabled={!startTime}
            shouldDisableTime={(value, view) => {
              if (!startTime) return true;
              
              const selected = dayjs(value);
              const diff = selected.diff(startTime, 'minute');
              
              if (view === 'minutes') {
                return value.minute() % 30 !== 0;
              }

              return diff < 30 || selected.hour() < startTime.hour();
            }}
          />

          <button className={styles.button} disabled={!endTime}>
            Підтвердити
          </button>
        </form>
      </div>
    </div>
  );
};
