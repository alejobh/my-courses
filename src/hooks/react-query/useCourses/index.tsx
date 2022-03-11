import { AxiosResponse } from 'axios';
import { QUERIES } from 'constants/queries';
import { useState } from 'react';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from 'react-query';
import coursesServices from 'services/courses';
import { ScreenSizesState } from 'types/common';
import { Course } from 'types/courses';
import { getLimit } from './utils';

const { getCourses, setFavorite, removeFavorite } = coursesServices;
export const useGetCourses = (email: string, screenSizes: ScreenSizesState) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const limit = getLimit(screenSizes);
  const query = useInfiniteQuery(
    [QUERIES.courses, { email, limit }],
    ({ pageParam = 1 }) => getCourses({ email, limit, offset: pageParam })(),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage?.data.length !== 0 && allPages.length * limit + limit,
      refetchOnWindowFocus: false,
    },
  );

  let data: Course[] = [];
  if (!!query.data?.pages && !query.isError) {
    const mergedPages = query.data.pages
      .map((page) => page.data)
      .reduce((acc, page) => acc.concat(page), []);
    data = showFavorites
      ? mergedPages.filter((course) => course.favorite)
      : mergedPages;
  }

  return {
    query,
    setShowFavorites,
    data,
    showFavorites,
  };
};

type CoursesSnapshot = InfiniteData<AxiosResponse<Course[]>> | undefined;

export const useMutateFavorite = (
  email: string,
  screenSizes: ScreenSizesState,
) => {
  const limit = getLimit(screenSizes);
  const queryClient = useQueryClient();
  const query = [QUERIES.courses, { email, limit }];
  const mutation = useMutation(
    ({
      course,
    }: {
      course: Course;
    }): Promise<AxiosResponse<null | { course_id: number; id: number }>> => {
      const body = { email, courseId: course.id };
      if (course.favorite) {
        return removeFavorite(body);
      }
      return setFavorite(body);
    },
    {
      onMutate: async (payload) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(query);

        // Snapshot the previous value
        const previousCourses: CoursesSnapshot =
          queryClient.getQueryData<CoursesSnapshot>(query) || undefined;

        const empty = { pageIndex: -1, index: -1 };
        const { pageIndex, index } =
          previousCourses?.pages?.reduce((acum, page, pageIdx) => {
            const idx = page.data.findIndex(
              (course) => course.id === payload.course.id,
            );
            return idx !== -1 ? { pageIndex: pageIdx, index: idx } : acum;
          }, empty) || empty;

        console.log(pageIndex, index);
        // Update the course in the snapshot
        if (pageIndex !== -1 && index !== -1 && previousCourses?.pages) {
          previousCourses.pages[pageIndex].data[index] = {
            ...payload.course,
            favorite: !payload.course.favorite,
          };
        }

        // Set query data to the updated snapshot
        queryClient.setQueryData(query, () => previousCourses);

        // Return a context object with the snapshotted value
        return { previousCourses };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (
        _,
        __,
        context: { previousCourses: CoursesSnapshot } | undefined,
      ) => {
        queryClient.setQueryData(query, context?.previousCourses);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(query);
      },
    },
  );
  return mutation;
};
