import { useGetCourses, useMutateFavorite } from 'hooks/react-query/useCourses';

import styles from './styles.module.scss';
import ToggleSwitch from 'components/ToggleSwitch';

import { EMAIL } from './constants';
import Course from './components/Course';
import { Course as ICourse } from 'types/courses';
import Skeleton from './components/Skeleton';
import { getSkeletonQuantity } from './utils';

export default function Courses() {
  const {
    query: { isLoading, isFetching, isError, error },
    setShowFavorites,
    data,
    offset,
  } = useGetCourses(EMAIL);

  const { mutate: toggleFavorite } = useMutateFavorite(EMAIL, offset);

  const handleToggleFavorite = (course: ICourse) => {
    toggleFavorite({ course });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles['page-title']}>Courses</h1>
      <ToggleSwitch onChange={() => setShowFavorites((prev) => !prev)} />
      <div className={styles['courses-container']}>
        {data.map((course) => (
          <Course
            key={course.id}
            course={course}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
        {(isLoading || isFetching) &&
          getSkeletonQuantity(!isLoading && isFetching).map((item) => (
            <Skeleton key={`skeleton-${item}`} />
          ))}
      </div>
      {isError && (
        <p className={styles.error}>Error: {JSON.stringify(error)}</p>
      )}
    </div>
  );
}
