import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Course from '.';

describe('Course test', () => {
  test('calls fav toggle function', () => {
    const onToggle = jest.fn();
    render(
      <Course
        onToggleFavorite={onToggle}
        course={{
          id: 1,
          title: 'title',
          instructor_image_url: '',
          instructor_name: 'Name',
          favorite: false,
        }}
      />,
    );
    expect(screen.getByText('title')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
