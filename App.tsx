import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigation from './src/navigations/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/shared/theme';
import i18nextConfig from './src/i18n/index';
import BottomSheetProvider from './src/contexts/BottomSheet/provider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import QueryClients from './src/config/QueryClient';
import {QueryClientProvider} from '@tanstack/react-query';

i18nextConfig.initalizeI18Next();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme.lightTheme}>
        <QueryClientProvider client={QueryClients}>
          <StatusBar />
          <BottomSheetProvider>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </BottomSheetProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
