import axios from 'axios';

interface GetAll {
  email: string;
  limit?: number;
  offset?: number;
}

export const getAll = ({ email, limit, offset }: GetAll) =>
  axios.get('jsonapi/v1/courses', {
    params: {
      email,
      ...(limit && { 'page[limit]': limit }),
      ...(offset && { 'page[offset]': offset }),
    },
  });
