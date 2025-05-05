import styles from './LocationCard.module.scss';
import { Link } from 'react-router-dom';
import { CourtAnimation } from '../CourtAnimation/CourtAnimation.tsx';
import { Location } from '../../types/Location.ts';

type Props = {
  location: Location;
  isAvailable: boolean;
  onClick: () => void;
};

export const LocationCard = ({ location, isAvailable, onClick }: Props) => {
  const { _id, name, image, mapLink, address } = location;
  
  return (
    <div className={styles.card}>
      <div
        className={`${styles.badge} ${isAvailable ? styles.free : styles.booked}`}
      >
        <span className={styles.indicator}></span>
        <span className={styles.text}>{isAvailable ? 'Вільний' : 'Зайнятий'}</span>
      </div>

      <Link to={`/calendar/${_id}`} key={_id} onClick={onClick}>
        {image ? (
          <div className="court-image">
            <img src={image} alt="Location" className={styles.locationImage} />
          </div>
        ) : (
          <CourtAnimation />
        )}
      </Link>
      
      <div className={styles.footer}>
        <div className={styles.row}>
          <h3 className={styles.name}>
            📍 {name}
          </h3>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.address}
          >
            {address}
          </a>
        </div>
      </div>
    </div>
  );
};
