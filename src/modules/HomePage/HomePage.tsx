import React from 'react';
import { Link } from 'react-router-dom';
import { locations } from '../../utils/locations';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      {/* <h2 className={styles.title}>Оберіть локацію:</h2> */}

      {locations.map((location) => (
        <Link to="/calendar" key={location.id} className={styles.locationCard}>
          <img
            src={location.image}
            alt="Location"
            className={styles.locationImage}
          />
          <h3 className={styles.locationName}>{location.name}</h3>
          <p className={styles.locationAddress}>{location.address}</p>
        </Link>
      ))}
    </div>
  );
};
