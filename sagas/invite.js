import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import * as authAPI from '../lib/api';

import {
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  ACCEPT_INVITATION_FAILURE,
  REFUSE_INVITATION_REQUEST,
  REFUSE_INVITATION_SUCCESS,
  REFUSE_INVITATION_FAILURE,
} from '../reducers/invite';

function* acceptInvitation(action) {
  try {
    const result = yield call(authAPI.acceptInvitation, action.data);
    yield put({
      type: ACCEPT_INVITATION_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ACCEPT_INVITATION_FAILURE,
      error,
    });
  }
}

function* refuseInvitation(action) {
  try {
    const result = yield call(authAPI.refuseInvitation, action.data);
    yield put({
      type: REFUSE_INVITATION_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: REFUSE_INVITATION_FAILURE,
      error,
    });
  }
}

function* watchAcceptInvitation() {
  yield takeLatest(ACCEPT_INVITATION_REQUEST, acceptInvitation);
}

function* watchRefuseInvitation() {
  yield takeLatest(REFUSE_INVITATION_REQUEST, refuseInvitation);
}

export default function* inviteSaga() {
  yield all([fork(watchAcceptInvitation), fork(watchRefuseInvitation)]);
}
