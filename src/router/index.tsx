// React
import React, { useContext } from 'react';
// Navigation
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screens
import { CreateProfileScreen } from '@src/screens/create-profile';
import { AllUsersScreen } from '@src/screens/all-users';
// Types
import { AppRouter } from '@src/types/AppRouter';
// Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '@src/context/ThemeContext';
import { baseTheme } from '@src/theme';

const Tab = createBottomTabNavigator<AppRouter>();

const tabs: {
  name: keyof AppRouter;
  displayName: string;
  icon: string;
  component: () => React.JSX.Element;
}[] = [
  {
    name: 'CreateProfile',
    displayName: 'Profile',
    icon: 'user',
    component: CreateProfileScreen,
  },
  {
    name: 'ViewProfiles',
    displayName: 'Users',
    icon: 'list-ul',
    component: AllUsersScreen,
  },
];

export const Router = (): React.ReactElement => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: theme.primary,
          background: theme.background,
        },
      }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {tabs.map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarLabel: tab.displayName,
              tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: baseTheme.typography.fonts['semi-bold'],
              },
              tabBarIcon: ({ focused }) => (
                <Icon
                  size={25}
                  name={tab.icon}
                  color={focused ? theme.primary : baseTheme.colors.black}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
