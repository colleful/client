import 'react-native-gesture-handler';
import React from 'react';
import MainNavigator from './screens/MainNavigator';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './modules';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

export default App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};
