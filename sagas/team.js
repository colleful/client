import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import * as authAPI from '../lib/api';
import {
  CHANGE_TEAM_STATUS_READY_REQUEST,
  CHANGE_TEAM_STATUS_READY_SUCCESS,
  CHANGE_TEAM_STATUS_READY_FAILURE,
  CHANGE_TEAM_STATUS_WATCHING_REQUEST,
  CHANGE_TEAM_STATUS_WATCHING_SUCCESS,
  CHANGE_TEAM_STATUS_WATCHING_FAILURE,
  FINISH_TEAM_MATCHING_REQUEST,
  FINISH_TEAM_MATCHING_SUCCESS,
  FINISH_TEAM_MATCHING_FAILURE,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE,
  EXIT_TEAM_REQUEST,
  EXIT_TEAM_SUCCESS,
  EXIT_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
} from '../reducers/team';

function* changeTeamStatusToReady() {
  try {
    const result = yield call(authAPI.changeTeamStatusToReady);
    yield put({
      type: CHANGE_TEAM_STATUS_READY_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CHANGE_TEAM_STATUS_READY_FAILURE,
      error,
    });
  }
}

function* changeTeamStatusToWatching() {
  try {
    const result = yield call(authAPI.changeTeamStatusToWatching);
    yield put({
      type: CHANGE_TEAM_STATUS_WATCHING_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CHANGE_TEAM_STATUS_WATCHING_FAILURE,
      error,
    });
  }
}

function* finishTeamMatching() {
  try {
    const result = yield call(authAPI.finishTeamMatching);
    yield put({
      type: FINISH_TEAM_MATCHING_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: FINISH_TEAM_MATCHING_FAILURE,
      error,
    });
  }
}

function* deleteTeam() {
  try {
    const result = yield call(authAPI.deleteTeam);
    yield put({
      type: DELETE_TEAM_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: DELETE_TEAM_FAILURE,
      error,
    });
  }
}

function* exitTeam(action) {
  try {
    const result = yield call(authAPI.exitTeam, action.data);
    yield put({
      type: EXIT_TEAM_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: EXIT_TEAM_FAILURE,
      error,
    });
  }
}

function* createTeam(action) {
  try {
    const result = yield call(authAPI.createTeam, action.data);
    yield put({
      type: CREATE_TEAM_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CREATE_TEAM_FAILURE,
      error,
    });
  }
}

function* watchChangeTeamStatusToReady() {
  yield takeLatest(CHANGE_TEAM_STATUS_READY_REQUEST, changeTeamStatusToReady);
}

function* watchChangeTeamStatusToWatching() {
  yield takeLatest(
    CHANGE_TEAM_STATUS_WATCHING_REQUEST,
    changeTeamStatusToWatching,
  );
}

function* watchFinishTeamMatching() {
  yield takeLatest(FINISH_TEAM_MATCHING_REQUEST, finishTeamMatching);
}

function* watchDeleteTeam() {
  yield takeLatest(DELETE_TEAM_REQUEST, deleteTeam);
}

function* watchExitTeam() {
  yield takeLatest(EXIT_TEAM_REQUEST, exitTeam);
}

function* watchCreateTeam() {
  yield takeLatest(CREATE_TEAM_REQUEST, createTeam);
}

export default function* teamSaga() {
  yield all([
    fork(watchChangeTeamStatusToReady),
    fork(watchChangeTeamStatusToWatching),
    fork(watchFinishTeamMatching),
    fork(watchDeleteTeam),
    fork(watchExitTeam),
    fork(watchCreateTeam),
  ]);
}
