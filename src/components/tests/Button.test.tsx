// React
import React from 'react';
// Testing
import {
  render,
  RenderResult,
  screen,
  userEvent,
} from '@src/test-utils/test-renderer';
// Component
import { Button, ButtonProps } from '../Button';

import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

const defaultProps: ButtonProps = {
  testID: 'button',
  title: 'Button title',
};

describe('Button tests', () => {
  const setup = (props?: Partial<ButtonProps>): RenderResult =>
    render(<Button {...defaultProps} {...props} />);

  it('Should render', () => {
    setup();

    expect(screen.root).toBeOnTheScreen();
  });

  it('Should show loading state', () => {
    setup({ loading: true });

    expect(screen.getByTestId('button-loader')).toBeOnTheScreen();
  });

  it('Should call onPress', async () => {
    const mockPress = jest.fn();

    setup({ onPress: mockPress });

    await userEvent.press(screen.getByTestId('button'));

    expect(mockPress).toHaveBeenCalled();
  });
});
