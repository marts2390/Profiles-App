import { baseTheme } from '../index';

export const getSpacing = (
  multiplier: number,
  type: 'width' | 'height',
): number => {
  const base =
    type === 'width'
      ? baseTheme.sizing['base-width']
      : baseTheme.sizing['base-height'];

  return base * multiplier;
};
