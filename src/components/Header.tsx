// React
import React, { useContext } from 'react';
// Native
import { StyleSheet, View } from 'react-native';
// Context
import { ThemeContext } from '@src/context/ThemeContext';
// Components
import { Switch } from './Switch';
import { Text } from './Text';
// Utils
import { getSpacing } from '@src/theme/utils/spacing';

export interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps): React.ReactElement => {
  const { currentTheme, setTheme } = useContext(ThemeContext);

  return (
    <View>
      <Switch
        style={styles.switch}
        value={currentTheme === 'dark'}
        onValueChange={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      />
      <Text variant="h1" weight="bold" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    alignSelf: 'flex-end',
  },
  title: {
    paddingTop: getSpacing(10, 'height'),
  },
});
