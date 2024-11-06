// React
import React from 'react';
// Native
import { Alert } from 'react-native';
// Testing
import {
  render,
  RenderResult,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from '@src/test-utils/test-renderer';
// Component
import { AllUsersScreen } from './index';
// Mocks
import MockAdapter from 'axios-mock-adapter';
import { users } from '@src/test-utils/mock-data/users';
// API
import delivery from '@src/delivery';

import '@testing-library/react-native/extend-expect';

const adapter = new MockAdapter(delivery.connector);

jest.useFakeTimers();

describe('All users screen', () => {
  adapter.onGet('/users').reply(200, users);

  const setup = (): RenderResult => render(<AllUsersScreen />);

  it('Should render', async () => {
    setup();

    expect(await screen.findByTestId('all-users')).toBeOnTheScreen();
  });

  it('Should show and hide loader', async () => {
    setup();

    expect(screen.getByTestId('loader')).toBeOnTheScreen();

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    expect(screen.getByTestId('all-users')).toBeOnTheScreen();
  });

  it('Should show all users', async () => {
    setup();

    expect(await screen.findAllByTestId('list-item')).toHaveLength(
      users.length,
    );
  });

  it('Should show Alert modal', async () => {
    setup();

    const spy = jest.spyOn(Alert, 'alert');

    await userEvent.press(await screen.findByTestId('list-item-1'));

    expect(spy).toHaveBeenCalled();
  });
});
