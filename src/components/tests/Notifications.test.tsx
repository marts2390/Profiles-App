import React from 'react';
// Component
import { Notifications } from '../Notifications';
// Testing
import {
  render,
  RenderResult,
  screen,
  waitForElementToBeRemoved,
} from '@src/test-utils/test-renderer';

import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

describe('Notifications tests', () => {
  const setup = (): RenderResult =>
    render(<Notifications />, {
      preloadedState: {
        notifications: {
          notifications: [
            {
              id: 1,
              text: 'hello',
              type: 'success',
            },
            {
              id: 2,
              text: 'hello',
              type: 'success',
            },
          ],
        },
      },
    });

  it('Should render', () => {
    setup();

    expect(screen.root).toBeOnTheScreen();
  });

  it('Should hide and show notifications', async () => {
    setup();

    expect(screen.getAllByTestId('snackbar')).toHaveLength(2);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId('snackbar'), {
      timeout: 6000,
    });

    expect(screen.queryAllByTestId('snackbar')).toHaveLength(0);
  });
});
