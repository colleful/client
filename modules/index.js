import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
// import user, {userSaga} from './user';
import auth, {authSaga} from './auth';
import loading from './loading';

const rootReducer = combineReducers({
  // user,
  auth,
  loading,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
