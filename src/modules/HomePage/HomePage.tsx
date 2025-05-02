import { locations } from '../../utils/locations';
import styles from './HomePage.module.scss';
import Card from './LocationCard/Card.tsx';

export type CourtLocation = {
  id: number;
  name: string;
  address: string;
  image: string;
  mapsLink: string;
};

export const HomePage = () => {
  return (
    <div className={styles.page}>
      {locations.map((location: CourtLocation) => (
        <Card location={location} isAvailable={false} key={location.id} />
      ))}
    </div>
  );
};
