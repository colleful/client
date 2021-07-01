import {all, fork} from 'redux-saga/effects';
import authSaga from './authentication';
import userSaga from './user';
import inviteSaga from './invite';
import teamSaga from './team';
import matchingSaga from './matching';
import departmentSaga from './department';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(inviteSaga),
    fork(teamSaga),
    fork(matchingSaga),
    fork(departmentSaga),
  ]);
}
