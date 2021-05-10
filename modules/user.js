// import {createAction, handleActions} from 'redux-actions';
// import produce from 'immer';
// import {takeLatest} from 'redux-saga/effects';
// import createRequestSaga, {
//   createRequestActionTypes,
// } from '../lib/createRequestSaga';
// import * as authAPI from '../lib/api';

// //액션
// const CHANGE_MY_INFO = 'user/CHANGE_MY_INFO';

// //API 액션
// const [
//   GET_MY_INFO,
//   GET_MY_INFO_SUCCESS,
//   GET_MY_INFO_FAILURE
// ] = createRequestActionTypes('user/GET_MY_INFO');
// const [
//   GET_USER_INFO,
//   GET_USER_INFO_SUCCESS,
//   GET_USER_INFO_FAILURE
// ] = createRequestActionTypes('user/GET_USER_INFO');

// //액션 함수
// export const changeMyInfo = createAction(CHANGE_MY_INFO);

// //API 액션 함수
// export const getMyInfo = createAction(GET_MY_INFO);
// export const getUserInfo = createAction(GET_USER_INFO);

// const getMyInfoSaga = createRequestSaga(GET_MY_INFO, authAPI.getMyInfo);
// const getUserInfoSaga = createRequestSaga(GET_USER_INFO, authAPI.getUserInfo);

// export function* userSaga() {
//   yield takeLatest(GET_MY_INFO, getMyInfoSaga);
//   yield takeLatest(GET_USER_INFO, getUserInfoSaga);
// }

// const initialState = {
//   myInfo: '',
//   myInfoError: null,

//   userInfo: '',
//   userInfoError: null,
// };

// const user = handleActions(
//   {
//     [CHANGE_MY_INFO]: (state, {payload: {form, value}}) =>
//     produce(state, (draft) => {
//       draft[form] = value;
//     }),
//     [GET_MY_INFO_SUCCESS]: (state, {payload: myInfo}) => ({
//       ...state,
//       myInfoError: null,
//       myInfo,
//     }),
//     [GET_MY_INFO_FAILURE]: (state, {payload: error}) => ({
//       ...state,
//       myInfoError: error,
//     }),

//     [GET_USER_INFO_SUCCESS]: (state, {payload: userInfo}) => ({
//       ...state,
//       userInfoError: null,
//       userInfo,
//     }),
//     [GET_USER_INFO_FAILURE]: (state, {payload: error}) => ({
//       ...state,
//       userInfoError: error,
//     }),
//   },
//   initialState,
// );

// export default user;
