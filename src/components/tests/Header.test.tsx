// React
import React from 'react';
// Testing
import { render, RenderResult, screen } from '@src/test-utils/test-renderer';
// Component
import { Header, HeaderProps } from '../Header';
// Context
import { ThemeContextDefaults } from '@src/context/ThemeContext';
// Types
import { ThemeMods } from '@src/theme';

import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

const defaultProps: HeaderProps = {
  title: 'Header title',
};

describe('Header test', () => {
  const setup = (props?: {theme: ThemeMods}): RenderResult =>
    render(<Header {...defaultProps} {...props} />, {
      theme: {
        ...ThemeContextDefaults,
        currentTheme: props?.theme || 'light',
      },
    });

  it('Should render', () => {
    setup();

    expect(screen.root).toBeOnTheScreen();
  });

  it('Should show title', () => {
    setup();

    expect(screen.getByText('Header title')).toBeOnTheScreen();
  });

  it('Should be not selected for light theme', async () => {
    setup();

    const comp = screen.getByTestId('switch');

    expect(comp.props.value).toBeFalsy();
  });

  it('Should be selected for dark theme', async () => {
    setup({ theme: 'dark' });

    const comp = screen.getByTestId('switch');

    expect(comp.props.value).toBeTruthy();
  });
});
