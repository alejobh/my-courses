import { useGetCourses } from 'hooks/react-query/useCourses';
import cn from 'classnames';

import { ReactComponent as Heart } from 'assets/heart.svg';
import styles from './styles.module.scss';

export default function Courses() {
  const {
    query: { isLoading, isError, error },
    setShowFavorites,
    data,
    showFavorites,
  } = useGetCourses();
  return (
    <div className={styles.container}>
      <h1 className={styles['page-title']}>Courses</h1>
      <button
        className={styles.filter}
        type="button"
        onClick={() => setShowFavorites((prev) => !prev)}>
        {showFavorites ? 'Show All' : 'Show Favs'}
      </button>
      <div className={styles['courses-container']}>
        {isLoading && <p className={styles.loader}>Loading...</p>}
        {data.map((course) => (
          <div className={styles['course-container']} key={course.id}>
            <img
              alt={`Instructor: ${course.instructor_name}`}
              src={course.instructor_image_url}
              className={styles.picture}
            />
            <div className={styles['info-container']}>
              <h4 className={styles.instructor}>{course.instructor_name}</h4>
              <p className={styles.title}>{course.title}</p>
            </div>
            <button className={styles.favorite} type="button">
              <Heart
                className={cn(
                  styles['favorite-icon'],
                  course.favorite && styles['is-favorite'],
                )}
              />
            </button>
          </div>
        ))}
        {isError && (
          <p className={styles.error}>Error: {JSON.stringify(error)}</p>
        )}
      </div>
    </div>
  );
}
