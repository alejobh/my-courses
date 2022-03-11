import { api } from 'config/api';
import { Course } from 'types/courses';

interface GetCourses {
  email: string;
  limit?: number;
  offset?: number;
}

interface CourseAction {
  email: string;
  courseId: number;
}

export default {
  getCourses:
    ({ email, limit, offset }: GetCourses) =>
    () =>
      api
        .get<Course[]>('jsonapi/v1/courses', {
          params: {
            email,
            ...(limit && { 'page[limit]': limit }),
            ...(offset && { 'page[offset]': offset }),
          },
        })
        .catch((error) => {
          throw error;
        }),
  setFavorite: ({ email, courseId }: CourseAction) =>
    api
      .post<{ course_id: number; id: number }>(`jsonapi/v1/favorite`, {
        email,
        course_id: courseId,
      })
      .catch((error) => {
        throw error;
      }),
  removeFavorite: ({ email, courseId }: CourseAction) =>
    api
      .delete<null>(`jsonapi/v1/favorite`, {
        data: {
          email,
          course_id: courseId,
        },
      })
      .catch((error) => {
        throw error;
      }),
};
