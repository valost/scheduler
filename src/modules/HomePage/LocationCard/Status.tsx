import styles from './Status.module.scss';

type Props = {
  isAvalible: boolean;
};

const Status = ({ isAvalible }: Props) => {
  return (
    <div
      className={`${styles.badge} ${isAvalible ? styles.free : styles.booked}`}
    >
      <span className={styles.indicator}></span>
      <span className={styles.text}>{isAvalible ? 'Вільний' : 'Зайнятий'}</span>
    </div>
  );
};

export default Status;
