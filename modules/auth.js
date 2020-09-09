import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import { takeLatest, actionChannel } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from '../lib/api';

//액션 타입 정의
// const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
// const SET_LOGIN_STATE = 'auth/SET_LOGIN_STATE';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
)

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
)

const [SEND_AUTH_EMAIL, SEND_AUTH_EMAIL_SUCCESS, SEND_AUTH_EMAIL_FAILURE] = createRequestActionTypes(
  'auth/SEND_AUTH_EMAIL',
)

const [CONFIRM_AUTH_EMAIL, CONFIRM_AUTH_EMAIL_SUCCESS, CONFIRM_AUTH_EMAIL_FAILURE] = createRequestActionTypes(
  'auth/CONFIRM_AUTH_EMAIL',
)

const AUTH_EMAIL_INITIALIZE = 'auth/AUTH_EMAIL_INITIALIZE';
const CONFIRM_AUTH_EMAIL_INITIALIZE = 'auth/CONFIRM_AUTH_EMAIL_INITIALIZE';
const EMAIL_VALID_STATUS = 'auth/EMAIL_VALID_STATUS';

//액션 함수 생성
// export const LoginSuccess = createAction(LOGIN_SUCCESS);
// export const SetLoginState = createAction(SET_LOGIN_STATE);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // email, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const register = createAction(REGISTER, ({ email, password, nickname, birthYear, gender, departmentId, selfIntroduction }) => ({
  email, password, nickname, birthYear, gender, departmentId, selfIntroduction
}));

export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password
}));

export const sendAuthEmail = createAction(SEND_AUTH_EMAIL, ({ email }) => ({
  email
}))

export const confirmAuthEmail = createAction(CONFIRM_AUTH_EMAIL, ({ email,code }) => ({
  email,
  code
}))

export const authEmailInitialize = createAction(AUTH_EMAIL_INITIALIZE);
export const confirmAuthEmailInitialize = createAction(CONFIRM_AUTH_EMAIL_INITIALIZE);
export const emailValidstatus = createAction(EMAIL_VALID_STATUS);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const sendAuthEmailSaga = createRequestSaga(SEND_AUTH_EMAIL, authAPI.sendAuthEmail);
const confirmAuthEmailSaga = createRequestSaga(CONFIRM_AUTH_EMAIL, authAPI.confirmAuthEmail);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SEND_AUTH_EMAIL, sendAuthEmailSaga);
  yield takeLatest(CONFIRM_AUTH_EMAIL, confirmAuthEmailSaga);
}

const initialState = {
  // isLoggedIn: false, //로그인했으면 메인화면으로 넘어가도록
  isEmailvalided: false,
  register: {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    birthYear: '',
    gender: '',
    departmentId: '',
    selfIntroduction: '',
    code: '',
  },
  login: {
    email: '',
    password: '',
  },
  auth: null,
  authError: null,

  emailAuth: null,
  emailAuthError: null, 

  confirmEmail: null,
  confirmEmailError: null,

  // token: '',
};

//리듀서
const auth = handleActions(
  {
    // [LOGIN_SUCCESS]: (state,action) => ({
    //   ...state,
    //   isLoggedIn: true,
    // }),
    // [SET_LOGIN_STATE]: (state,action) => ({
    //   ...state,
    //   ...action.payload,
    //   isLoggedIn: true,
    // }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        ( key === "birthYear" || key === "departmentId" || key === "code" ) ? draft[form][key] = parseInt(value,10) || '' : draft[form][key] = value 
        // draft[form][key] = value  ==>  state.register.email = ''
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      isEmailvalided: false,
      authError: null // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 이메일인증 보내기 성공
    [SEND_AUTH_EMAIL_SUCCESS]: (state, { payload: emailAuth }) => ({
      ...state,
      emailAuthError: null,
      emailAuth
    }),
    // 이메일인증 보내기 완료후 emailAuth가 ''이 되고 성공했다는 Alert후 다시 null로 초기화 하려고
    [AUTH_EMAIL_INITIALIZE]: (state, { payload: emailAuth }) => ({
      ...state,
      emailAuth
    }),
    // 이메일인증 보내기 실패
    [SEND_AUTH_EMAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      emailAuthError: error
    }),
    // 이메일 인증하기 성공
    [CONFIRM_AUTH_EMAIL_SUCCESS]: (state, { payload: confirmEmail }) => ({
      ...state,
      confirmEmailError: null,
      confirmEmail
    }),
    // 이메일 인증하기 실패
    [CONFIRM_AUTH_EMAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      confirmEmailError: error
    }),
    // 이메일인증 보내기 완료후 confirmEmail이 ''이 되고 성공했다는 Alert후 다시 null로 초기화 하려고 
    [CONFIRM_AUTH_EMAIL_INITIALIZE]: (state, { payload: confirmEmail }) => ({
      ...state,
      confirmEmail
    }),
    [EMAIL_VALID_STATUS]: (state, { payload: { form, value } }) => 
      produce(state, draft => {
        draft[form] = value
    }),
  },
  initialState
);

export default auth;
