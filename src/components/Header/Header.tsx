import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

type Props = {
  backLink: string;
}

export const Header = ({ backLink }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <Link to={backLink} className={styles.buttonBack}>Назад</Link>
        
        <button className={styles.buttonUser}>Мій кабінет</button>
      </div>
    </div>
  )
}