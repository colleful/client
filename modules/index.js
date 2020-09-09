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

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
