// React
import React from 'react';
// Native
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
// Store
import * as Store from '@store/index';
// Components
import { SnackBar } from './SnackBar';
// Safe Area
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
// Theme
import { getSpacing } from '@src/theme/utils/spacing';
// Animations
import Animated, { LinearTransition } from 'react-native-reanimated';

export const Notifications = (): React.ReactElement => {
  const notifications = Store.useSelector(
    (store) => store.notifications.notifications,
  );
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);

  return (
    <KeyboardAvoidingView behavior="position">
      {!!notifications.length && (
        <Animated.View
          layout={LinearTransition}
          style={styles.root}
          testID="global-notification">
          {notifications.map((item) => (
            <SnackBar item={item} key={item.id} />
          ))}
        </Animated.View>
      )}
    </KeyboardAvoidingView>
  );
};

const useStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    root: {
      position: 'absolute',
      bottom: insets.bottom + getSpacing(16, 'height'),
    },
  });
