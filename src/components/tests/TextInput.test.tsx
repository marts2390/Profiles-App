// React
import React from 'react';
// Native
import { TextInputProps } from 'react-native';
// Testing
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@src/test-utils/test-renderer';
// Component
import { TextInput } from '../TextInput';

import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

describe('Text Input tests', () => {
  const setup = (props?: Partial<TextInputProps>): RenderResult =>
    render(<TextInput {...props} />);

  it('Should render', () => {
    setup();

    expect(screen.root).toBeOnTheScreen();
  });

  it('Should have focused border', async () => {
    setup({ testID: 'input' });

    const comp = screen.getByTestId('input');

    fireEvent(comp, 'onFocus');

    expect(comp).toHaveStyle({
      borderColor: '#EF626C',
    });

    fireEvent(comp, 'onBlur');

    expect(comp).toHaveStyle({
      borderColor: '#FFFFFF',
    });
  });
});
