import { useNavigate } from 'react-router-dom';
import { LocationCard } from '../../components/LocationCard/LocationCard.tsx';
import { Location } from '../../types/Location.ts';
import { locations } from '../../utils/locations.ts';
import styles from './HomePage.module.scss';
import { useState } from 'react';
import { UnavailableModal } from '../../components/UnavailableModal/UnavailableModal.tsx';

export const HomePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (locationId: string, isWorking: boolean) => {
    if (isWorking) {
      navigate(`calendar/${locationId}`);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.page}>
      {locations.map((location: Location) => {
        const isWorking = location._id === '1';

        return (
          <LocationCard
            location={location}
            // isAvailable={true}
            isWorking={isWorking}
            key={location._id}
            onClick={() => handleCardClick(location._id, isWorking)}
          />
        );
      })}

      {showModal && (
        <div className={styles.modalOverlay}>
          <UnavailableModal onClose={closeModal} />
        </div>
      )}
    </div>
  );
};
