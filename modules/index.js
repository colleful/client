import {combineReducers} from 'redux';
import { all } from 'redux-saga/effects';
import team from './team';
import auth, { authSaga } from './auth';
import loading from './loading';

const rootReducer = combineReducers({
  team,
  auth,
  loading,
});

// export const SECURITY_LEVEL = Object.freeze({ ANY: RNKeychainManager && RNKeychainManager.SECURITY_LEVEL_ANY, SECURE_SOFTWARE: RNKeychainManager && RNKeychainManager.SECURITY_LEVEL_SECURE_SOFTWARE, SECURE_HARDWARE: RNKeychainManager && RNKeychainManager.SECURITY_LEVEL_SECURE_HARDWARE, });

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
