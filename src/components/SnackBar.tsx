// React
import React, { useCallback, useEffect } from 'react';
// Native
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
// Components
import { Text } from './Text';
// Store
import * as Store from '@store/index';
// Types
import { Notification, NotificationTypes } from '@src/types/Notifications';
// Theme
import { getSpacing } from '@src/theme/utils/spacing';
import { baseTheme } from '@src/theme';
// Animation
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface SnackBarProps {
  item: Notification;
}

export const SnackBar = ({ item }: SnackBarProps): React.ReactElement => {
  const dispatch = Store.useDispatch();
  const leftValue = useSharedValue(Dimensions.get('screen').width);

  const styles = useStyles(item.type);

  const animatedStyles = useAnimatedStyle(
    () => ({
      left: leftValue.value,
    }),
    [leftValue.value],
  );

  const dimiss = useCallback((): void => {
    leftValue.value = withTiming(Dimensions.get('screen').width + 200);

    setTimeout(
      () => dispatch(Store.Notifications.removeNotification(item.id)),
      250,
    );
  }, [dispatch, item.id, leftValue]);

  useEffect(() => {
    leftValue.value = withSpring(getSpacing(5, 'width'), {
      mass: 0.5,
    });

    setTimeout(() => dimiss(), 5000);
  }, [leftValue, dimiss]);

  return (
    <Animated.View
      key={item.id}
      layout={LinearTransition}
      style={[styles.root, animatedStyles]}
      testID="snackbar">
      <View style={styles.inner}>
        <Icon
          testID="snackbar-icon"
          name={
            item.type === 'error' ? 'error-outline' : 'check-circle-outline'
          }
          color={baseTheme.colors.white}
          size={30}
        />
        <View style={styles.container}>
          <Text
            variant="body-small"
            weight="semi-bold"
            color={baseTheme.colors.white}>
            {item.text}
          </Text>
        </View>
      </View>
      <Pressable onPress={dimiss} testID="snack-bar-dismiss">
        <Icon name="close" color={baseTheme.colors.white} size={20} />
      </Pressable>
    </Animated.View>
  );
};

const useStyles = (variant: NotificationTypes) =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: getSpacing(4, 'width'),
      paddingVertical: getSpacing(4, 'height'),
      width: Dimensions.get('screen').width - getSpacing(10, 'width'),
      borderRadius: getSpacing(4, 'width'),
      marginTop: getSpacing(2, 'height'),
      shadowColor: baseTheme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor:
        variant === 'error' ? baseTheme.colors.error : baseTheme.colors.success,
    },
    inner: {
      flex: 0.9,
      flexDirection: 'row',
      alignItems: 'center',
    },
    subTitle: {
      marginTop: getSpacing(1, 'height'),
    },
    container: {
      marginLeft: getSpacing(4, 'width'),
    },
  });
