import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleSwitch from '.';

describe('ToggleSwitch test', () => {
  test('Shows left and right text', () => {
    render(
      <ToggleSwitch
        onChange={jest.fn()}
        leftOptionText="Left"
        rightOptionText="Right"
      />,
    );

    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  test('Toggles selected option', () => {
    const onChange = jest.fn();
    render(
      <ToggleSwitch
        onChange={onChange}
        leftOptionText="Left"
        rightOptionText="Right"
      />,
    );
    userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
