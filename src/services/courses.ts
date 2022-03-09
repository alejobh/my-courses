import { api } from 'config/api';
import { Course } from 'types/courses';

interface GetCourses {
  email: string;
  limit?: number;
  offset?: number;
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
};
