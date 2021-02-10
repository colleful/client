import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import team from './team';
import user, {userSaga} from './user';
import auth, {authSaga} from './auth';
import loading from './loading';

const rootReducer = combineReducers({
  team,
  user,
  auth,
  loading,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
