// React
import React from 'react';
// Testing
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  userEvent,
} from '@src/test-utils/test-renderer';
// Component
import { CreateProfileScreen } from './index';
// Mocks
import MockAdapter from 'axios-mock-adapter';
// Store
import { App } from '@src/store';
// API
import delivery from '@src/delivery';

import '@testing-library/react-native/extend-expect';

const adapter = new MockAdapter(delivery.connector);

jest.useFakeTimers();

describe('Create profile screen', () => {
  const setup = (): RenderResult => render(<CreateProfileScreen />);

  it('Should render', () => {
    setup();

    expect(screen.root).toBeOnTheScreen();
  });

  it('Should handle create profile', async () => {
    adapter.onPost('/users').reply(200, { id: 123 });

    setup();

    const spy = jest.spyOn(App, 'createUser');

    await userEvent.type(screen.getByTestId('firstName'), 'Chris');
    await userEvent.type(screen.getByTestId('lastName'), 'Martyr');
    await userEvent.type(screen.getByTestId('email'), 'chris@email.com');

    fireEvent(screen.getByTestId('age'), 'onValueChange', 50);

    await userEvent.press(screen.getByTestId('create-profile'));

    expect(spy).toHaveBeenCalledWith({
      user: {
        age: 50,
        email: 'chris@email.com',
        firstName: 'Chris',
        lastName: 'Martyr',
      },
    });
  });

  it('Should format placeholders', () => {
    setup();

    expect(screen.getByTestId('firstName').props.placeholder).toBe(
      'First name',
    );
    expect(screen.getByTestId('lastName').props.placeholder).toBe('Last name');
    expect(screen.getByTestId('email').props.placeholder).toBe('Email');
  });
});
