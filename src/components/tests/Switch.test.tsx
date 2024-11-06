// React
import React from 'react';
// Native
import { SwitchProps } from 'react-native';
// Component
import { Switch } from '../Switch';
// Testing
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@src/test-utils/test-renderer';

import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

const defaultProps: SwitchProps = {
  onValueChange: jest.fn(),
  value: false,
};

describe('Switch tests', () => {
  const setup = (props?: SwitchProps): RenderResult =>
    render(<Switch {...defaultProps} {...props} />);

  it('Should render', () => {
    setup();

    expect(screen.root).toBeOnTheScreen();
  });

  it('Should have correct false value', async () => {
    setup();

    expect(screen.getByTestId('switch').props.value).toBe(false);
  });

  it('Should have correct true value', async () => {
    setup({ value: true });

    expect(screen.getByTestId('switch').props.value).toBe(true);
  });

  it('Should call onChange', () => {
    setup();

    fireEvent(screen.getByTestId('switch'), 'onValueChange', true);

    expect(defaultProps.onValueChange).toHaveBeenCalled();
  });
});
