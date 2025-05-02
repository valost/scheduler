import styles from './Footer.module.scss';

const getAccentColor = (id: number) => {
  const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#FF6FD8'];
  return colors[id % colors.length];
};

type Props = {
  id: number;
  name: string;
  address?: string;
  mapLink?: string;
};
const CardFooter = ({ id, name, address, mapLink }: Props) => {
  const accentColor = getAccentColor(id);

  return (
    <div className={styles.footer} style={{ borderTopColor: accentColor }}>
      <div className={styles.row}>
        <h3 className={styles.name} style={{ color: accentColor }}>
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
  );
};

export default CardFooter;
