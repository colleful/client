import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import * as authAPI from '../lib/api';

import {
  GET_DEPARTMENT_REQUEST,
  GET_DEPARTMENT_SUCCESS,
  GET_DEPARTMENT_FAILURE,
} from '../reducers/department';

function* getDepartment() {
  try {
    const result = yield call(authAPI.getDepartment);
    yield put({
      type: GET_DEPARTMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: GET_DEPARTMENT_FAILURE,
      error,
    });
  }
}
function* watchGetDepartment() {
  yield takeLatest(GET_DEPARTMENT_REQUEST, getDepartment);
}

export default function* inviteSaga() {
  yield all([fork(watchGetDepartment)]);
}
