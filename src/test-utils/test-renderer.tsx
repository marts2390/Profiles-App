// React
import React, { PropsWithChildren, ReactElement } from 'react';
// RNTL
import {
  RenderOptions,
  RenderResult,
  render,
  userEvent,
} from '@testing-library/react-native';
// Context
import * as Theme from '@src/context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Store
import { AppRootState, AppStore, setupStore, Provider } from '@src/store';
// Navigation
import { NavigationContext } from '@react-navigation/native';

// Add additional context interfaces here to change data for tests
export interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: Partial<AppRootState>;
  store?: AppStore;
  theme?: Theme.ThemeContextInterface;
}

const customUserEvent = userEvent.setup();

const customRender = (
  ui: ReactElement,
  options?: Omit<ExtendedRenderOptions, 'wrapper'>,
): RenderResult => {
  const store = setupStore(options?.preloadedState);

  const actualNav = jest.requireActual('@react-navigation/native');
  const navContext = {
    ...actualNav.navigation,
    navigate: () => null,
    dangerouslyGetState: () => null,
    setOptions: () => null,
    addListener: () => () => null,
    isFocused: () => true,
  };

  const AllTheProviders = ({ children }: PropsWithChildren): ReactElement => (
    <NavigationContext.Provider value={navContext}>
      <Provider testStore={store}>
        <SafeAreaProvider>
          <Theme.ThemeContext.Provider
            value={options?.theme || Theme.ThemeContextDefaults}>
            {children}
          </Theme.ThemeContext.Provider>
        </SafeAreaProvider>
      </Provider>
    </NavigationContext.Provider>
  );

  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react-native';

export { customUserEvent as userEvent };

export { customRender as render };
