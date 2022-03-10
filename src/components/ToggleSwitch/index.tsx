import { ChangeEventHandler } from 'react';
import styles from './styles.module.scss';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function ToggleSwitch({ onChange }: Props) {
  return (
    <label className={styles['toggle-format']}>
      <input onChange={onChange} className={styles.checkbox} type="checkbox" />
      <div className={styles.slider} />
      <span className={styles.option}>All</span>
      <span className={styles.option}>Favorites</span>
    </label>
  );
}
