import styles from './LocationCard.module.scss';
import { Link } from 'react-router-dom';
import { CourtAnimation } from '../CourtAnimation/CourtAnimation.tsx';
import { Location } from '../../types/Location.ts';

type Props = {
  location: Location;
  isWorking: boolean;
  onClick: () => void;
};

export const LocationCard = ({
  location,
  isWorking,
  onClick,
}: Props) => {
  const { _id, name, image, mapLink, address } = location;

  return (
    <div className={styles.card}>
      <Link
        to={isWorking ? `/calendar/${_id}` : '#'}
        key={_id}
        onClick={onClick}
      >
        {image ? (
          <div className={styles.imageWrapper}>
            <img src={image} alt="Location" className={styles.locationImage} />
          </div>
        ) : (
          <div className={styles.imageWrapper}>
            <CourtAnimation />
          </div>
        )}
      </Link>

      <div className={styles.footer}>
        <div className={styles.row}>
          <h3 className={styles.name}>📍 {name}</h3>
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
