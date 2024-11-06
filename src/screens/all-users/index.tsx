// React
import React, { useCallback } from 'react';
// Native
import { ActivityIndicator, Alert, Pressable, View } from 'react-native';
// Store
import * as Store from '@store/index';
// Navigation
import { useFocusEffect } from '@react-navigation/native';
// Components
import { Header } from '@src/components/Header';
import { Card } from '@src/components/Card';
import { Text } from '@src/components/Text';
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
// Hooks
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Theme
import { baseTheme } from '@src/theme';
import { useStyles } from './styles';
// Animations
import Animated, { LinearTransition } from 'react-native-reanimated';

export const AllUsersScreen = (): React.ReactElement => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);

  const dispatch = Store.useDispatch();
  const users = Store.useSelector((store) => store.app.users);
  const loading = Store.useSelector((store) => store.app.usersLoading);

  useFocusEffect(
    useCallback(() => {
      dispatch(Store.App.getUsers());
    }, [dispatch]),
  );

  return (
    <View style={styles.root}>
      {loading ? (
        <View style={styles.loadingContainer} testID="loader">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Animated.FlatList
          testID="all-users"
          data={users}
          itemLayoutAnimation={LinearTransition}
          contentContainerStyle={styles.content}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponentStyle={styles.header}
          ListHeaderComponent={() => <Header title="Users" />}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text center variant="h2" weight="bold">
                No users added
              </Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <Card style={styles.listItem} testID="list-item">
              <View>
                <Text
                  variant="body-large"
                  weight="bold">{`${item.firstName} ${item.lastName}`}</Text>
                <Text variant="body-small">{item.email}</Text>
                <Text variant="body-small">{item.age} years</Text>
              </View>
              <Pressable
                testID={`list-item-${index}`}
                onPress={() => {
                  Alert.alert(
                    `Are you sure you want to delete ${item.firstName} ${item.lastName}`,
                    '',
                    [
                      {
                        text: 'Yes',
                        onPress: () => dispatch(Store.App.removeUser(item.id)),
                        style: 'destructive',
                      },
                      {
                        text: 'No',
                      },
                    ],
                  );
                }}>
                <Icon
                  name="delete-outline"
                  size={32}
                  color={baseTheme.colors.error}
                />
              </Pressable>
            </Card>
          )}
        />
      )}
    </View>
  );
};
