// React
import React, { useContext, useState } from 'react';
// Native
import { TextInput as RnInput, TextInputProps, StyleSheet } from 'react-native';
// Context
import { ThemeContext } from '@src/context/ThemeContext';
// Theme
import { baseTheme, ColorTheme } from '@src/theme';
// Utils
import { getSpacing } from '@src/theme/utils/spacing';

export const TextInput = ({
  testID,
  placeholder,
  onChangeText,
  style,
  value,
  keyboardType,
}: TextInputProps): React.ReactElement => {
  const { theme } = useContext(ThemeContext);

  const [focused, setFocused] = useState(false);

  const styles = useStyles(theme, focused);

  return (
    <RnInput
      testID={testID}
      value={value}
      style={[styles.root, style]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      onFocus={() => setFocused(!focused)}
      onBlur={() => setFocused(false)}
    />
  );
};

const useStyles = (theme: ColorTheme, focused: boolean) =>
  StyleSheet.create({
    root: {
      width: '100%',
      backgroundColor: baseTheme.colors.white,
      paddingVertical: getSpacing(4, 'height'),
      paddingHorizontal: getSpacing(4, 'width'),
      borderRadius: getSpacing(3, 'width'),
      fontFamily: baseTheme.typography.fonts.regular,
      borderWidth: 2,
      borderColor: focused ? theme.primary : baseTheme.colors.white,
    },
  });
