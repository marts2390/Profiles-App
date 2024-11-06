// React
import React, { useContext } from 'react';
// Native
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native';
// Context
import { ThemeContext } from '@src/context/ThemeContext';
// Theme
import { baseTheme, ColorTheme } from '@src/theme';
// Utils
import { getSpacing } from '@src/theme/utils/spacing';
// Components
import { Text } from './Text';

export interface ButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
}

export const Button = ({
  testID,
  title,
  onPress,
  loading,
}: ButtonProps): React.ReactElement => {
  const { theme } = useContext(ThemeContext);

  const styles = useStyles(theme);

  return (
    <Pressable
      style={styles.root}
      onPress={onPress}
      disabled={loading}
      testID={testID}>
      {loading ? (
        <ActivityIndicator
          color={baseTheme.colors.white}
          testID="button-loader"
        />
      ) : (
        <Text color={baseTheme.colors.white} weight="bold">
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const useStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.primary,
      color: theme.text,
      width: '100%',
      borderRadius: getSpacing(3, 'width'),
      paddingVertical: getSpacing(4, 'height'),
      paddingHorizontal: getSpacing(4, 'width'),
      alignItems: 'center',
      justifyContent: 'center',
      height: getSpacing(15, 'height'),
    },
  });
