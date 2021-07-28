/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React from 'react';
import AppNavigation from './AppNavigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import bluetoothReducers from './reducers/bluetoothReducers';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = creatSagaMiddleware();
let store = createStore(bluetoothReducers,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);


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
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>      
    </Provider>
  );
};

export default App;
