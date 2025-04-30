import styles from './BookingModal.module.scss';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';

type Props = {
  selectedDay: string | null;
  onClose: () => void;
};

export const BookingModal = ({ selectedDay, onClose }: Props) => {
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const generateTimeOptions = () => {
    const options = [];
    let time = dayjs(selectedDay).hour(5).minute(0).startOf('minute');
    const closingTime = dayjs(selectedDay).hour(22).minute(0).startOf('minute');

    while (time.isBefore(closingTime) || time.isSame(closingTime)) {
      const formattedTime = time.format('HH:mm');
      options.push(formattedTime);
      time = time.add(30, 'minute');
    }

    return options;
  };

  const timeOptions = generateTimeOptions();
  const filteredStartTimeOptions = timeOptions.filter(
    (time) => time !== '22:00',
  );

  const filteredEndTimeOptions = startTime
    ? timeOptions.filter((time) => {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = time.split(':').map(Number);

        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;
        const result = endTotalMinutes >= startTotalMinutes + 30;

        return result;
      })
    : timeOptions;

  const handleStartTimeChange = (newTime: string) => {
    setStartTime(newTime);
    setEndTime(null);
  };

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
          <Dropdown
            label="Початок тренування:"
            options={filteredStartTimeOptions}
            selected={startTime}
            onSelect={handleStartTimeChange}
          />

          <Dropdown
            label="Кінець тренування:"
            options={filteredEndTimeOptions}
            selected={endTime}
            onSelect={setEndTime}
            disabled={!startTime}
          />

          <button className={styles.button} disabled={!endTime}>
            Підтвердити
          </button>
        </form>
      </div>
    </div>
  );
};
