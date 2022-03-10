import styles from './styles.module.scss';

const QUANTITY = Array.from(Array(8).keys());

export default function CoursesSkeleton() {
  return (
    <div className={styles.container}>
      {QUANTITY.map((item) => (
        <div
          key={`course-skeleton-${item}`}
          className={styles['item-container']}>
          <div className={styles.image} />
          <div className={styles.instructor} />
          <div className={styles.title} />
          <div className={styles.title} />
        </div>
      ))}
    </div>
  );
}
