import 'react-native-gesture-handler';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import SwitchNavigator from './screens/SwitchNavigator';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {NavigationContainer} from '@react-navigation/native';
import {setLoginState} from './reducers/auth';
import {setCustomText} from 'react-native-global-props';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

const loadToken = async () => {
  try {
    const user = await AsyncStorage.getItem('authorization');
    if (!user) return; //로그인 상태아니면 아무것도 안하도록

    store.dispatch(setLoginState(true));
  } catch (error) {
    console.log(error);
  }
};

sagaMiddleware.run(rootSaga);
loadToken();

const customTextProps = {
  style: {
    fontFamily: 'AntDesign',
  },
};
setCustomText(customTextProps);

export default App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SwitchNavigator />
      </NavigationContainer>
    </Provider>
  );
};
