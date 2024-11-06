// React
import React, { PropsWithChildren, useContext } from 'react';
// Native
import {
  Text as RnText,
  StyleSheet,
  TextProps as RnTextProps,
} from 'react-native';
// Context
import { ThemeContext } from '@src/context/ThemeContext';
// Theme
import { baseTheme, ColorTheme, FontVariants, FontWeights } from '@src/theme';

export interface TextProps extends RnTextProps {
  variant?: FontVariants;
  weight?: FontWeights;
  color?: string;
  center?: boolean;
}

export const Text = ({
  variant = 'body-medium',
  weight = 'regular',
  style,
  color,
  center,
  children,
}: PropsWithChildren<TextProps>): React.ReactElement => {
  const { theme } = useContext(ThemeContext);

  const styles = useStyles(theme, variant, weight, color, center);

  return (
    <RnText testID="text" style={[styles.root, style]}>
      {children}
    </RnText>
  );
};

const useStyles = (
  theme: ColorTheme,
  variant: FontVariants,
  weight: FontWeights,
  color?: string,
  center?: boolean,
) =>
  StyleSheet.create({
    root: {
      color: color || theme.text,
      fontSize: baseTheme.typography.sizes[variant],
      fontFamily: baseTheme.typography.fonts[weight],
      textAlign: center ? 'center' : 'auto',
    },
  });
