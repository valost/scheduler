import { getCloseMenuIcon } from '../../utils/getImages';
import styles from './UnavailableModal.module.scss';

type Props = {
  onClose: () => void;
};

export const UnavailableModal = ({ onClose }: Props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <button onClick={() => onClose()} className={styles.buttonClose}>
          <img src={getCloseMenuIcon()} alt="Close" />
        </button>

        <p className={styles.text}>Цей корт буде доступний незабаром!</p>
      </div>
    </div>
  );
};
