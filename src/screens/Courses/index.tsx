import { useGetCourses, useMutateFavorite } from 'hooks/react-query/useCourses';

import styles from './styles.module.scss';
import ToggleSwitch from 'components/ToggleSwitch';

import { EMAIL } from './constants';
import Course from './components/Course';
import { Course as ICourse } from 'types/courses';
import Skeleton from './components/Skeleton';
import { getSkeletonQuantity } from './utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useScreenSize } from 'hooks/useScreenSize';

export default function Courses() {
  const screenSizes = useScreenSize();

  const {
    query: {
      isLoading,
      isError,
      error,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      fetchNextPage,
    },
    setShowFavorites,
    data,
    showFavorites,
  } = useGetCourses(EMAIL, screenSizes);

  const { mutate: toggleFavorite, isLoading: isLoadingFav } = useMutateFavorite(
    EMAIL,
    screenSizes,
  );

  const handleToggleFavorite = (course: ICourse) => {
    toggleFavorite({ course });
  };

  return (
    <div className={styles.container} id="scrollableDiv">
      <h1 className={styles['page-title']}>Courses</h1>
      <ToggleSwitch
        onChange={() => setShowFavorites((prev) => !prev)}
        leftOptionText="All"
        rightOptionText="Favorites"
      />
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasNextPage || isFetching}
        next={() => fetchNextPage()}
        className={styles['courses-container']}
        loader={<Skeleton />}>
        {data.map((course) => (
          <Course
            key={course.id}
            course={course}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
        {(isLoading || isFetchingNextPage) &&
          getSkeletonQuantity(
            !isLoading && isFetchingNextPage && !isLoadingFav,
          ).map((item) => <Skeleton key={`skeleton-${item}`} />)}
      </InfiniteScroll>
      {!data.length && !isLoading && !isFetchingNextPage && (
        <h4 className={styles['info-text']}>
          {showFavorites
            ? "You have no favorite courses yet, let's fav some :)"
            : 'There are no courses to show :('}
        </h4>
      )}
      {isError && (
        <p className={styles.error}>Error: {JSON.stringify(error)}</p>
      )}
    </div>
  );
}
