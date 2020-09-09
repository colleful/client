import 'react-native-gesture-handler';
import React from 'react';
// import SwitchNavigator from './screens/SwitchNavigator';
import AuthContainer from './container/AuthContainer';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer, { rootSaga } from './modules';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default App = () => {
  return (
    <Provider store={store}>
      <AuthContainer />  
    </Provider>
  );
};
