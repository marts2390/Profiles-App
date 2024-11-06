// React
import React from 'react';
// Testing
import { render, RenderResult, screen } from '@src/test-utils/test-renderer';
// Component
import { Card, CardProps } from '../Card';
import { Text } from '../Text';

import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

const defaultProps: CardProps = {
  testID: 'card',
};

describe('Card tests', () => {
  const setup = (props?: Partial<CardProps>): RenderResult =>
    render(<Card {...defaultProps} {...props} />);

  it('Should render', () => {
    setup();

    expect(screen.root).toBeOnTheScreen();
  });

  it('Should render content', () => {
    render(
      <Card {...defaultProps}>
        <Text>Hello world</Text>
      </Card>,
    );

    expect(screen.getByText('Hello world')).toBeOnTheScreen();
  });
});
