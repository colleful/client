import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import * as authAPI from '../lib/api';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SEND_AUTH_EMAIL_REQUEST,
  SEND_AUTH_EMAIL_SUCCESS,
  SEND_AUTH_EMAIL_FAILURE,
  CONFIRM_AUTH_EMAIL_REQUEST,
  CONFIRM_AUTH_EMAIL_SUCCESS,
  CONFIRM_AUTH_EMAIL_FAILURE,
  CONFIRM_PASSWORD_AUTH_EMAIL_REQUEST,
  CONFIRM_PASSWORD_AUTH_EMAIL_SUCCESS,
  CONFIRM_PASSWORD_AUTH_EMAIL_FAILURE,
  SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_REQUEST,
  SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_SUCCESS,
  SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from '../reducers/auth';

function* register(action) {
  try {
    const result = yield call(authAPI.register, action.data);
    yield put({
      type: REGISTER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      error,
    });
  }
}

function* login(action) {
  try {
    const result = yield call(authAPI.login, action.data);
    console.log("result",result)
    yield put({
      type: LOGIN_SUCCESS,
      data: result.headers,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error,
    });
  }
}

function* sendAuthEmail(action) {
  try {
    const result = yield call(authAPI.sendAuthEmail, action.data);
    yield put({
      type: SEND_AUTH_EMAIL_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: SEND_AUTH_EMAIL_FAILURE,
      error,
    });
  }
}

function* confirmAuthEmail(action) {
  try {
    const result = yield call(authAPI.confirmAuthEmail, action.data);
    yield put({
      type: CONFIRM_AUTH_EMAIL_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CONFIRM_AUTH_EMAIL_FAILURE,
      error,
    });
  }
}

function* confirmPasswordAuthEmail(action) {
  try {
    const result = yield call(authAPI.confirmAuthEmail, action.data);
    yield put({
      type: CONFIRM_PASSWORD_AUTH_EMAIL_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CONFIRM_PASSWORD_AUTH_EMAIL_FAILURE,
      error,
    });
  }
}

function* sendAuthEmailForPasswordChange(action) {
  try {
    const result = yield call(authAPI.sendAuthEmailForPasswordChange, action.data);
    yield put({
      type: SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_FAILURE,
      error,
    });
  }
}

function* changePassword(action) {
  try {
    const result = yield call(authAPI.changePassword, action.data);
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CHANGE_PASSWORD_FAILURE,
      error,
    });
  }
}

// 이벤트 리스너 같은 역할, 리듀서에서 request 액션을 감지하고 change

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}
function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
function* watchSendAuthEmail() {
  yield takeLatest(SEND_AUTH_EMAIL_REQUEST, sendAuthEmail);
}
function* watchConfirmAuthEmail() {
  yield takeLatest(CONFIRM_AUTH_EMAIL_REQUEST, confirmAuthEmail);
}
function* watchConfirmPasswordAuthEmail() {
  yield takeLatest(
    CONFIRM_PASSWORD_AUTH_EMAIL_REQUEST,
    confirmPasswordAuthEmail,
  );
}
function* watchSendAuthEmailForPasswordChange() {
  yield takeLatest(
    SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_REQUEST,
    sendAuthEmailForPasswordChange,
  );
}
function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}

export default function* authSaga() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchSendAuthEmail),
    fork(watchConfirmAuthEmail),
    fork(watchConfirmPasswordAuthEmail),
    fork(watchSendAuthEmailForPasswordChange),
    fork(watchChangePassword),
  ]);
}
