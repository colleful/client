import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import * as authAPI from '../lib/api';

import {
  ACCEPT_MATCHING_REQUEST,
  ACCEPT_MATCHING_SUCCESS,
  ACCEPT_MATCHING_FAILURE,
  REFUSE_MATCHING_REQUEST,
  REFUSE_MATCHING_SUCCESS,
  REFUSE_MATCHING_FAILURE,
  DELETE_MATCHING_REQUEST,
  DELETE_MATCHING_SUCCESS,
  DELETE_MATCHING_FAILURE,
} from '../reducers/matching';

function* acceptMatching(action) {
  try {
    const result = yield call(authAPI.acceptMatching, action.data);
    yield put({
      type: ACCEPT_MATCHING_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: ACCEPT_MATCHING_FAILURE,
      error,
    });
  }
}

function* refuseMatching(action) {
  try {
    const result = yield call(authAPI.refuseMatching, action.data);
    yield put({
      type: REFUSE_MATCHING_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: REFUSE_MATCHING_FAILURE,
      error,
    });
  }
}

function* deleteMatching(action) {
  try {
    const result = yield call(authAPI.deleteMatching, action.data);
    yield put({
      type: DELETE_MATCHING_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: DELETE_MATCHING_FAILURE,
      error,
    });
  }
}

function* watchAcceptMatching() {
  yield takeLatest(ACCEPT_MATCHING_REQUEST, acceptMatching);
}

function* watchRefuseMatching() {
  yield takeLatest(REFUSE_MATCHING_REQUEST, refuseMatching);
}

function* watchDeleteMatching() {
  yield takeLatest(DELETE_MATCHING_REQUEST, deleteMatching);
}

export default function* matchingSaga() {
  yield all([
    fork(watchAcceptMatching),
    fork(watchRefuseMatching),
    fork(watchDeleteMatching),
  ]);
}
