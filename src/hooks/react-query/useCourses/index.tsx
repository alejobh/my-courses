import { QUERIES } from 'constants/queries';
import { useState } from 'react';
import { useQuery } from 'react-query';
import coursesServices from 'services/courses';
import { Course } from 'types/courses';

const LIMIT = 10;
export const useGetCourses = () => {
  const [email, setEmail] = useState('alejandro.bermudez@rootstrap.com');
  const [limit, setLimit] = useState(LIMIT);
  const [offset, setOffset] = useState(1);
  const [showFavorites, setShowFavorites] = useState(false);

  const query = useQuery(
    [QUERIES.courses, { email, limit, offset }],
    coursesServices.getCourses({ email, limit, offset }),
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
    setEmail,
    setLimit,
    setOffset,
  };
};
