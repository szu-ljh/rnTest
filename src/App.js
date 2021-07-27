/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React from 'react';
import AppNavigation from './AppNavigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#458B74',
    accent: '#11B5E4',
  },
};
const App = () => {
  return (
    <PaperProvider theme={theme}>
      <AppNavigation />
    </PaperProvider>
  );
};

export default App;
