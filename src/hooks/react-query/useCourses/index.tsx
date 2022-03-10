import { AxiosResponse } from 'axios';
import { QUERIES } from 'constants/queries';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import coursesServices from 'services/courses';
import { Course } from 'types/courses';

const { getCourses, setFavorite, removeFavorite } = coursesServices;
const LIMIT = 10;
export const useGetCourses = (email: string) => {
  const [offset, setOffset] = useState(1);
  const [showFavorites, setShowFavorites] = useState(false);

  const query = useQuery(
    [QUERIES.courses, { email, limit: LIMIT, offset }],
    getCourses({ email, limit: LIMIT, offset }),
  );

  let data: Course[] = [];
  if (query.data?.data && !query.isError) {
    data = showFavorites
      ? query.data.data.filter((course) => course.favorite)
      : query.data.data;
  }

  return {
    query,
    setShowFavorites,
    data,
    showFavorites,
    setOffset,
    offset,
  };
};

type CoursesSnapshot = AxiosResponse<Course[]> | undefined;

export const useMutateFavorite = (email: string, offset: number) => {
  const queryClient = useQueryClient();
  const query = [QUERIES.courses, { email, limit: LIMIT, offset }];
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

        // Find the index of the course we're mutating
        const index = previousCourses?.data.findIndex(
          (course) => course.id === payload.course.id,
        );

        // Update the course in the snapshot
        if (index && previousCourses) {
          previousCourses.data[index] = {
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
