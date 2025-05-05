import { useNavigate } from 'react-router-dom';
import { LocationCard } from '../../components/LocationCard/LocationCard.tsx';
import { Location } from '../../types/Location.ts';
import { locations } from '../../utils/locations.ts';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (locationId: string) => {
    navigate(`calendar/${locationId}`);
  }
  
  return (
    <div className={styles.page}>
      {locations.map((location: Location) => (
        <LocationCard 
          location={location} 
          isAvailable={false} 
          key={location._id} 
          onClick={() => handleCardClick(location._id)}
        />
      ))}
    </div>
  );
};
