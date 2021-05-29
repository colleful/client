import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import * as authAPI from '../lib/api';
import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  CHANGE_USER_INFO_REQUEST,
  CHANGE_USER_INFO_SUCCESS,
  CHANGE_USER_INFO_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  CHANGE_USER_PASSWORD_REQUEST,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_FAILURE,
} from '../reducers/user';

function* loadUser(action) {
  try {
    const result = yield call(authAPI.getUserInfo, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_USER_FAILURE,
      error,
    });
  }
}

function* changeUserInfo(action) {
  try {
    const result = yield call(authAPI.changeUserInfo, action.data);
    yield put({
      type: CHANGE_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CHANGE_USER_INFO_FAILURE,
      error,
    });
  }
}

function* deleteUser(action) {
  try {
    const result = yield call(authAPI.deleteUser, action.data);
    yield put({
      type: DELETE_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: DELETE_USER_FAILURE,
      error,
    });
  }
}

function* changeUserPassword(action) {
  try {
    const result = yield call(authAPI.changeUserPassword, action.data);
    yield put({
      type: CHANGE_USER_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CHANGE_USER_PASSWORD_FAILURE,
      error,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchChangeUserInfo() {
  yield takeLatest(CHANGE_USER_INFO_REQUEST, changeUserInfo);
}

function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
}

function* watchChangeUserPassword() {
  yield takeLatest(CHANGE_USER_PASSWORD_REQUEST, changeUserPassword);
}


export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchChangeUserInfo),
    fork(watchDeleteUser),
    fork(watchChangeUserPassword),
  ]);
}
