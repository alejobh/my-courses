import { QueryClientProvider, QueryClient } from 'react-query';
import { render, screen } from '@testing-library/react';

import Routes from '.';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('when there is a user', () => {
  test('shows Home screen when being on the home path', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/courses']}>
          <Routes />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText('Courses')).toBeInTheDocument();
  });
});
