import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import * as authAPI from '../lib/api';

import {
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  ACCEPT_INVITATION_FAILURE,
  REFUSE_INVITATION_REQUEST,
  REFUSE_INVITATION_SUCCESS,
  REFUSE_INVITATION_FAILURE,
  SEARCH_USER_BY_NICKNAME_REQUEST,
  SEARCH_USER_BY_NICKNAME_SUCCESS,
  SEARCH_USER_BY_NICKNAME_FAILURE,
  INVITE_TEAM_REQUEST,
  INVITE_TEAM_SUCCESS,
  INVITE_TEAM_FAILURE,
  DELETE_INVITATION_REQUEST,
  DELETE_INVITATION_SUCCESS,
  DELETE_INVITATION_FAILURE,
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

function* deleteInvitation(action) {
  try {
    const result = yield call(authAPI.deleteInvitation, action.data);
    yield put({
      type: DELETE_INVITATION_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: DELETE_INVITATION_FAILURE,
      error,
    });
  }
}

function* inviteTeam(action) {
  try {
    const result = yield call(authAPI.inviteTeam, action.data);
    yield put({
      type: INVITE_TEAM_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: INVITE_TEAM_FAILURE,
      error,
    });
  }
}

function* searchUserByNickname(action) {
  try {
    const result = yield call(authAPI.searchUserByNickname, action.data);
    yield put({
      type: SEARCH_USER_BY_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: SEARCH_USER_BY_NICKNAME_FAILURE,
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

function* watchDeleteInvitation() {
  yield takeLatest(DELETE_INVITATION_REQUEST, deleteInvitation);
}

function* watchInviteTeam() {
  yield takeLatest(INVITE_TEAM_REQUEST, inviteTeam);
}

function* watchSearchUserByNickname() {
  yield takeLatest(SEARCH_USER_BY_NICKNAME_REQUEST, searchUserByNickname);
}

export default function* inviteSaga() {
  yield all([
    fork(watchAcceptInvitation),
    fork(watchRefuseInvitation),
    fork(watchDeleteInvitation),
    fork(watchSearchUserByNickname),
    fork(watchInviteTeam),
  ]);
}
