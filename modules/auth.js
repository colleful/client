import {createAction, createActions, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api';

//액션 타입 정의
const SET_LOGIN_STATE = 'auth/SET_LOGIN_STATE';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';

const AUTH_EMAIL_INITIALIZE = 'auth/AUTH_EMAIL_INITIALIZE';
const CONFIRM_AUTH_EMAIL_INITIALIZE = 'auth/CONFIRM_AUTH_EMAIL_INITIALIZE';
const PASSWORD_EMAIL_AUTH_INITIALIZE = 'auth/PASSWORD_EMAIL_AUTH_INITIALIZE';
const PASSWORD_CHANGE_INITIALIZE = 'auth/PASSWORD_CHANGE_INITIALIZE';
const EMAIL_VALID_STATUS = 'auth/EMAIL_VALID_STATUS';

//API액션
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);
const [
  SEND_AUTH_EMAIL,
  SEND_AUTH_EMAIL_SUCCESS,
  SEND_AUTH_EMAIL_FAILURE,
] = createRequestActionTypes('auth/SEND_AUTH_EMAIL');
const [
  SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE,
  SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_SUCCESS,
  SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_FAILURE,
] = createRequestActionTypes('auth/SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE');
const [
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
] = createRequestActionTypes('auth/CHANGE_PASSWORD');
const [
  CONFIRM_AUTH_EMAIL,
  CONFIRM_AUTH_EMAIL_SUCCESS,
  CONFIRM_AUTH_EMAIL_FAILURE,
] = createRequestActionTypes('auth/CONFIRM_AUTH_EMAIL');

//액션 함수 생성
export const setLoginState = createAction(
  SET_LOGIN_STATE,
  (isLoggedIn) => isLoggedIn,
);
export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => ({
  form, // register , login
  key, // email, password, passwordConfirm
  value, // 실제 바꾸려는 값
}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const authEmailInitialize = createAction(AUTH_EMAIL_INITIALIZE);
export const confirmAuthEmailInitialize = createAction(
  CONFIRM_AUTH_EMAIL_INITIALIZE,
);
export const passwordChangeInitialize = createAction(
  PASSWORD_CHANGE_INITIALIZE,
);
export const emailValidstatus = createAction(EMAIL_VALID_STATUS);
export const passwordEmailAuthInitialize = createAction(
  PASSWORD_EMAIL_AUTH_INITIALIZE,
);

//API 액션 함수
export const register = createAction(
  REGISTER,
  ({
    email,
    password,
    nickname,
    birthYear,
    gender,
    departmentId,
    selfIntroduction,
  }) => ({
    email,
    password,
    nickname,
    birthYear,
    gender,
    departmentId,
    selfIntroduction,
  }),
);
export const login = createAction(LOGIN, ({email, password}) => ({
  email,
  password,
}));
export const sendAuthEmail = createAction(SEND_AUTH_EMAIL, ({email}) => ({
  email,
}));
export const confirmAuthEmail = createAction(
  CONFIRM_AUTH_EMAIL,
  ({email, code}) => ({
    email,
    code,
  }),
);
export const sendAuthEmailForPasswordChange = createAction(
  SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE,
  ({email}) => ({
    email,
  }),
);
export const changePassword = createAction(
  CHANGE_PASSWORD,
  ({email, password}) => ({
    email,
    password,
  }),
);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const sendAuthEmailSaga = createRequestSaga(
  SEND_AUTH_EMAIL,
  authAPI.sendAuthEmail,
);
const confirmAuthEmailSaga = createRequestSaga(
  CONFIRM_AUTH_EMAIL,
  authAPI.confirmAuthEmail,
);
const sendAuthEmailForPasswordChangeSaga = createRequestSaga(
  SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE,
  authAPI.sendAuthEmailForPasswordChange,
);
const changePasswordSaga = createRequestSaga(
  CHANGE_PASSWORD,
  authAPI.changePassword,
);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SEND_AUTH_EMAIL, sendAuthEmailSaga);
  yield takeLatest(CONFIRM_AUTH_EMAIL, confirmAuthEmailSaga);
  yield takeLatest(
    SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE,
    sendAuthEmailForPasswordChangeSaga,
  );
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

const initialState = {
  isLoggedIn: false,

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
  forgetPassword: {
    email: '',
    password: '',
    passwordConfirm: '',
    code: '',
  },
  auth: null,
  authError: null,

  emailAuth: null,
  emailAuthError: null,

  confirmEmail: null,
  confirmEmailError: null,

  passwordEmailAuth: null,
  passwordEmailAuthError: null,

  passwordChange: null,
  passwordChangeError: null,

  isEmailvalided: false,
};

//리듀서
const auth = handleActions(
  {
    [SET_LOGIN_STATE]: (state, {payload: isLoggedIn}) => ({
      ...state,
      isLoggedIn,
    }),
    [CHANGE_FIELD]: (state, {payload: {form, key, value}}) =>
      produce(state, (draft) => {
        key === 'birthYear' || key === 'departmentId' || key === 'code'
          ? (draft[form][key] = parseInt(value, 10) || '')
          : (draft[form][key] = value); // draft[form][key] = value  ==>  state.register.email = ''
      }),
    [INITIALIZE_FORM]: (state, {payload: form}) => ({
      ...state,
      [form]: initialState[form],
      isEmailvalided: false,
      authError: null, // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, {payload: error}) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, {payload: error}) => ({
      ...state,
      authError: error,
    }),
    // 이메일인증 보내기 성공
    [SEND_AUTH_EMAIL_SUCCESS]: (state, {payload: emailAuth}) => ({
      ...state,
      emailAuthError: null,
      emailAuth,
    }),
    // 이메일인증 보내기 완료후 emailAuth가 ''이 되고 성공했다는 Alert후 다시 null로 초기화 하려고
    [AUTH_EMAIL_INITIALIZE]: (state, {payload: emailAuth}) => ({
      ...state,
      emailAuth,
    }),
    // 이메일인증 보내기 실패
    [SEND_AUTH_EMAIL_FAILURE]: (state, {payload: error}) => ({
      ...state,
      emailAuthError: error,
    }),
    // 이메일 인증하기 성공
    [CONFIRM_AUTH_EMAIL_SUCCESS]: (state, {payload: confirmEmail}) => ({
      ...state,
      confirmEmailError: null,
      confirmEmail,
    }),
    // 이메일 인증하기 실패
    [CONFIRM_AUTH_EMAIL_FAILURE]: (state, {payload: error}) => ({
      ...state,
      confirmEmailError: error,
    }),
    // 비밀번호 찾기 모달에서 이메일 인증하기 성공
    [SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_SUCCESS]: (
      state,
      {payload: passwordEmailAuth},
    ) => ({
      ...state,
      passwordEmailAuthError: null,
      passwordEmailAuth,
    }),
    // 비밀번호 찾기 모달에서 이메일 인증하기 실패
    [SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_FAILURE]: (
      state,
      {payload: error},
    ) => ({
      ...state,
      passwordEmailAuthError: error,
    }),
    // 비밀번호 변경 성공
    [CHANGE_PASSWORD_SUCCESS]: (state, {payload: passwordChange}) => ({
      ...state,
      passwordChangeError: null,
      passwordChange,
    }),
    // 비밀번호 변경 실패
    [CHANGE_PASSWORD_FAILURE]: (state, {payload: error}) => ({
      ...state,
      passwordChangeError: error,
    }),
    [PASSWORD_EMAIL_AUTH_INITIALIZE]: (
      state,
      {payload: passwordEmailAuth},
    ) => ({
      ...state,
      passwordEmailAuth,
    }),
    // 이메일인증 보내기 완료후 confirmEmail이 ''이 되고 성공했다는 Alert후 다시 null로 초기화 하려고
    [CONFIRM_AUTH_EMAIL_INITIALIZE]: (state, {payload: confirmEmail}) => ({
      ...state,
      confirmEmail,
    }),
    [PASSWORD_CHANGE_INITIALIZE]: (state, {payload: passwordChange}) => ({
      ...state,
      passwordChange,
    }),
    [EMAIL_VALID_STATUS]: (state, {payload: {form, value}}) =>
      produce(state, (draft) => {
        draft[form] = value;
      }),
  },
  initialState,
);

export default auth;
