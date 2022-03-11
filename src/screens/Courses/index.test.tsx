import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { QueryClient, QueryClientProvider } from 'react-query';
import Courses from '.';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock(
  './components/Course',
  () =>
    function Course() {
      return <div>Course</div>;
    },
);

jest.mock(
  './components/Skeleton',
  () =>
    function Course() {
      return <div>Course Skeleton</div>;
    },
);

jest.mock('services/courses.ts', () => {
  const mod = jest.requireActual('services/courses.ts');

  return {
    ...mod,
    __esModule: true,
    default: {
      getCourses: () => () => Promise.resolve({ data: [] }),
      setFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    },
  };
});

describe('Courses index page', () => {
  test('Toggles favorites view', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Courses />
      </QueryClientProvider>,
    );

    userEvent.click(screen.getByRole('checkbox'));

    expect(
      await screen.findByText(
        "You have no favorite courses yet, let's fav some :)",
      ),
    ).toBeInTheDocument();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
