import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';

type Props = {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export const Dropdown = ({
  label,
  options,
  selected,
  onSelect,
  disabled = false
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('Clicked element:', event.target);
      console.log('Dropdown ref:', dropdownRef.current);

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);
  
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.label}>{label}</div>

      <button 
        type="button"
        className={`${styles.dropdownButton} ${disabled ? styles.disabled : ''}`} 
        onClick={handleToggle}
        disabled={disabled}
      >
        {selected || '--'}
      </button>

      {isOpen && !disabled && (
        <ul className={styles.options}>
          {options.map(option => (
            <li
              key={option}
              className={styles.option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}