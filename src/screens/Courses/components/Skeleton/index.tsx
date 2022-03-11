import styles from './styles.module.scss';

export default function CoursesSkeleton() {
  return (
    <div className={styles['item-container']}>
      <div className={styles.image} />
      <div className={styles.instructor} />
      <div className={styles.title} />
      <div className={styles.title} />
    </div>
  );
}
