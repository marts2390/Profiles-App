// React
import React, { useContext } from 'react';
// Native
import { Switch as RnSwitch, SwitchProps as RnSwitchProps } from 'react-native';
// Context
import { ThemeContext } from '@src/context/ThemeContext';

export const Switch = ({
  onValueChange,
  value,
  style,
}: RnSwitchProps): React.ReactElement => {
  const { theme } = useContext(ThemeContext);

  return (
    <RnSwitch
      testID="switch"
      style={style}
      onValueChange={onValueChange}
      value={value}
      thumbColor={theme.secondary}
      trackColor={{
        true: theme.primary,
        false: theme.secondary,
      }}
    />
  );
};
