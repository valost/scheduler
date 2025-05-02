import styles from './Image.module.scss';

type Props = {
  image: string;
};

const Image = ({ image }: Props) => {
  return (
    <div className="court-image">
      <img src={image} alt="Location" className={styles.locationImage} />
    </div>
  );
};

export default Image;
