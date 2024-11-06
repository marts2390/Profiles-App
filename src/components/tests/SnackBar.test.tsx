import React from 'react';
// Testing
import {
  render,
  RenderResult,
  screen,
  userEvent,
  waitFor,
} from '@src/test-utils/test-renderer';
// Components
import { SnackBar, SnackBarProps } from '@src/components/SnackBar';
// Theme
import { baseTheme } from '@src/theme';
// Store
import { Notifications } from '@src/store';

import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

const defaultProps: SnackBarProps = {
  item: {
    id: 1,
    type: 'success',
    text: 'hello',
  },
};

describe('SnackBar tests', () => {
  const setup = (props?: Partial<SnackBarProps>): RenderResult =>
    render(<SnackBar {...defaultProps} {...props} />);

  it('Display snack bar', async () => {
    setup();

    expect(screen.getByTestId('snackbar')).toBeOnTheScreen();
  });

  it('Should have success style', () => {
    setup();

    expect(screen.getByTestId('snackbar')).toHaveStyle({
      backgroundColor: baseTheme.colors.success,
    });
  });

  it('Should have error style', () => {
    setup({ item: { ...defaultProps.item, type: 'error' } });

    expect(screen.getByTestId('snackbar')).toHaveStyle({
      backgroundColor: baseTheme.colors.error,
    });
  });

  it('Should dismiss on press', async () => {
    const spy = jest.spyOn(Notifications, 'removeNotification');

    setup();

    await userEvent.press(screen.getByTestId('snack-bar-dismiss'));

    await waitFor(() => expect(spy).toHaveBeenCalled());
  });
});
