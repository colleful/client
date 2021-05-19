import {all, fork} from 'redux-saga/effects';
import authSaga from './auth';
import userSaga from './user';
import inviteSaga from './invite';
import teamSaga from './team';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(inviteSaga), fork(teamSaga)]);
}
