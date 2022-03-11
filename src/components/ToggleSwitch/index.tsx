import { ChangeEventHandler } from 'react';
import styles from './styles.module.scss';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
  leftOptionText: string;
  rightOptionText: string;
}

export default function ToggleSwitch({
  onChange,
  leftOptionText,
  rightOptionText,
}: Props) {
  return (
    <label className={styles['toggle-format']}>
      <input onChange={onChange} className={styles.checkbox} type="checkbox" />
      <div className={styles.slider} />
      <span className={styles.option}>{leftOptionText}</span>
      <span className={styles.option}>{rightOptionText}</span>
    </label>
  );
}
