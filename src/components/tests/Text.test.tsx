// React
import React from 'react';
// Component
import { Text, TextProps } from '../Text';
// Testing
import { render, RenderResult, screen } from '@src/test-utils/test-renderer';

import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

describe('Text tests', () => {
  const setup = (props?: TextProps): RenderResult =>
    render(<Text {...props}>Hello world</Text>);

  const rerender = (props?: TextProps): void =>
    screen.rerender(<Text {...props}>Hello world</Text>);

  it('Should render', () => {
    setup();

    expect(screen.getByText('Hello world')).toBeOnTheScreen();
  });

  it('Should have correct variant styles', () => {
    setup({ variant: 'h1' });

    const comp = screen.getByTestId('text');

    expect(comp).toHaveStyle({
      fontSize: 32,
    });

    rerender({ variant: 'h2' });

    expect(comp).toHaveStyle({
      fontSize: 20,
    });

    rerender({ variant: 'body-large' });

    expect(comp).toHaveStyle({
      fontSize: 18,
    });

    rerender({ variant: 'body-medium' });

    expect(comp).toHaveStyle({
      fontSize: 16,
    });

    rerender({ variant: 'body-small' });

    expect(comp).toHaveStyle({
      fontSize: 14,
    });
  });

  it('Should have correct weight styles', () => {
    setup();

    const comp = screen.getByTestId('text');

    expect(comp).toHaveStyle({
      fontFamily: 'Poppins-Regular',
    });

    rerender({ weight: 'bold' });

    expect(comp).toHaveStyle({
      fontFamily: 'Poppins-Bold',
    });

    rerender({ weight: 'semi-bold' });

    expect(comp).toHaveStyle({
      fontFamily: 'Poppins-Medium',
    });
  });

  it('Should have correct alignment', () => {
    setup();
    const comp = screen.getByTestId('text');

    expect(comp).toHaveStyle({
      textAlign: 'auto',
    });

    rerender({ center: true });

    expect(comp).toHaveStyle({
      textAlign: 'center',
    });
  });
});
