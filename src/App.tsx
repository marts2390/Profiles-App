// React
import React from 'react';
// Store
import { Provider } from './store';
// Router
import { Router } from './router';
// Contexts
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContextProvider } from './context/ThemeContext';
// Components
import { Notifications } from './components/Notifications';

export const App = (): React.ReactElement => (
  <Provider>
    <ThemeContextProvider>
      <SafeAreaProvider>
        <Router />
        <Notifications />
      </SafeAreaProvider>
    </ThemeContextProvider>
  </Provider>
);
