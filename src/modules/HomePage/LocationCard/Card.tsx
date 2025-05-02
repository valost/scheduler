import styles from './Card.module.scss';
import Status from './Status.tsx';
import Footer from './Footer.tsx';
import { CourtLocation } from '../HomePage.tsx';
import { Link } from 'react-router-dom';
import Image from './Image.tsx';
import Court from './Court.tsx';

type Props = {
  location: CourtLocation;
  isAvailable: boolean;
};

const LocationCard = ({ location, isAvailable }: Props) => {
  return (
    <div className={styles.card}>
      <Status isAvalible={isAvailable} />
      <Link to="/calendar" key={location.id}>
        {location.image ? <Image image={location.image} /> : <Court />}
      </Link>
      <Footer
        id={location.id}
        name={location.name}
        address={location.address}
        mapLink={location.mapsLink}
      />
    </div>
  );
};

export default LocationCard;
