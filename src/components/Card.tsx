// React
import React, { PropsWithChildren, useContext } from 'react';
// Native
import { StyleSheet, ViewStyle } from 'react-native';
// Context
import { ThemeContext } from '@src/context/ThemeContext';
// Theme
import { baseTheme, ThemeMods } from '@src/theme';
// Utils
import { getSpacing } from '@src/theme/utils/spacing';
// Animations
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export interface CardProps {
  testID?: string;
  style?: ViewStyle;
}

export const Card = ({
  testID,
  children,
  style,
}: PropsWithChildren<CardProps>): React.ReactElement => {
  const { currentTheme } = useContext(ThemeContext);

  const styles = useStyles(currentTheme);

  return (
    <Animated.View
      testID={testID}
      entering={FadeIn}
      exiting={FadeOut}
      style={{ ...styles.root, ...style }}>
      {children}
    </Animated.View>
  );
};

const useStyles = (currentTheme: ThemeMods) =>
  StyleSheet.create({
    root: {
      paddingHorizontal: getSpacing(5, 'width'),
      paddingVertical: getSpacing(5, 'height'),
      borderRadius: getSpacing(3, 'width'),
      backgroundColor:
        baseTheme.colors[currentTheme === 'light' ? 'white' : 'black'],
    },
  });
