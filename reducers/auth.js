import produce from 'immer';

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
  authLoading: false,
  authError: null,

  emailAuth: null, // 회원가입용 이메일 인증 보내기 성공하면 '', 아니면 null
  emailAuthLoading: false,
  emailAuthError: null,

  confirmEmail: null, // 회원가입용 이메일 인증 확인 성공하면 '', 아니면 null
  confirmEmailLoading: false,
  confirmEmailError: null,

  passwordEmailAuth: null, // 비밀번호 찾기 이메일 인증 보내기 성공하면 '', 아니면 null
  passwordEmailAuthLoading: false,
  passwordEmailAuthError: null,

  passwordConfirmEmail: null, // 비밀번호 찾기 이메일 인증 확인 성공하면 '', 아니면 null
  passwordConfirmEmailLoading: false,
  passwordConfirmEmailError: null,

  passwordChange: null, // 비밀번호 변경 성공하면 '', 아니면 null
  passwordChangeLoading: false,
  passwordChangeError: null,
};

// 액션
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const CHANGE_FIELD = 'CHANGE_FIELD';
export const INITIALIZE_FORM = 'INITIALIZE_FORM';

// API 액션
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SEND_AUTH_EMAIL_REQUEST = 'SEND_AUTH_EMAIL_REQUEST';
export const SEND_AUTH_EMAIL_SUCCESS = 'SEND_AUTH_EMAIL_SUCCESS';
export const SEND_AUTH_EMAIL_FAILURE = 'SEND_AUTH_EMAIL_FAILURE';

export const SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_REQUEST =
  'SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_REQUEST';
export const SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_SUCCESS =
  'SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_SUCCESS';
export const SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_FAILURE =
  'SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_FAILURE';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const CONFIRM_AUTH_EMAIL_REQUEST = 'CONFIRM_AUTH_EMAIL_REQUEST';
export const CONFIRM_AUTH_EMAIL_SUCCESS = 'CONFIRM_AUTH_EMAIL_SUCCESS';
export const CONFIRM_AUTH_EMAIL_FAILURE = 'CONFIRM_AUTH_EMAIL_FAILURE';

export const CONFIRM_PASSWORD_AUTH_EMAIL_REQUEST =
  'CONFIRM_PASSWORD_AUTH_EMAIL_REQUEST';
export const CONFIRM_PASSWORD_AUTH_EMAIL_SUCCESS =
  'CONFIRM_PASSWORD_AUTH_EMAIL_SUCCESS';
export const CONFIRM_PASSWORD_AUTH_EMAIL_FAILURE =
  'CONFIRM_PASSWORD_AUTH_EMAIL_FAILURE';

//액션 생성 함수
export const setLoginState = (data) => ({
  type: SET_LOGIN_STATE,
  data,
});
export const changeField = (data) => ({
  type: CHANGE_FIELD,
  data,
});
export const initializeForm = (data) => ({
  type: INITIALIZE_FORM,
  data,
});

//API 액션 생성 함수
export const register = (data) => ({
  type: REGISTER_REQUEST,
  data,
});
export const login = (data) => ({
  type: LOGIN_REQUEST,
  data,
});
export const sendAuthEmail = (data) => ({
  type: SEND_AUTH_EMAIL_REQUEST,
  data,
});
export const confirmAuthEmail = (data) => ({
  type: CONFIRM_AUTH_EMAIL_REQUEST,
  data,
});
export const confirmPasswordAuthEmail = (data) => ({
  type: CONFIRM_PASSWORD_AUTH_EMAIL_REQUEST,
  data,
});
export const sendAuthEmailForPasswordChange = (data) => ({
  type: SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_REQUEST,
  data,
});
export const changePassword = (data) => ({
  type: CHANGE_PASSWORD_REQUEST,
  data,
});

//리듀서
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN_STATE:
        draft.isLoggedIn = action.data;
        break;
      case CHANGE_FIELD:
        draft[action.data.form][action.data.key] = action.data.value;
        break;
      case INITIALIZE_FORM:
        draft[action.data] = initialState[action.data];
        draft.emailValid = false;
        draft.authError = null;
        break;
      case REGISTER_REQUEST:
        draft.authLoading = true;
        draft.auth = null;
        draft.authError = null;
        break;
      case REGISTER_SUCCESS:
        draft.authLoading = false;
        draft.auth = action.data;
        draft.authError = null;
        break;
      case REGISTER_FAILURE:
        draft.authLoading = false;
        draft.authError = action.error;
        break;
      case LOGIN_REQUEST:
        draft.authLoading = true;
        draft.auth = null;
        draft.authError = null;
        break;
      case LOGIN_SUCCESS:
        draft.authLoading = false;
        draft.auth = action.data;
        draft.authError = null;
        break;
      case LOGIN_FAILURE:
        draft.authLoading = false;
        draft.authError = action.error;
        break;
      case SEND_AUTH_EMAIL_REQUEST:
        draft.emailAuthLoading = true;
        draft.emailAuth = null;
        draft.emailAuthError = null;
        break;
      case SEND_AUTH_EMAIL_SUCCESS:
        draft.emailAuthLoading = false;
        draft.emailAuth = action.data;
        draft.emailAuthError = null;
        break;
      case SEND_AUTH_EMAIL_FAILURE:
        draft.emailAuthLoading = false;
        draft.emailAuthError = action.error;
        break;
      case CONFIRM_AUTH_EMAIL_REQUEST:
        draft.confirmEmailLoading = true;
        draft.confirmEmail = null;
        draft.confirmEmailError = null;
        break;
      case CONFIRM_AUTH_EMAIL_SUCCESS:
        draft.confirmEmailLoading = false;
        draft.confirmEmail = action.data;
        draft.confirmEmailError = null;
        break;
      case CONFIRM_AUTH_EMAIL_FAILURE:
        draft.confirmEmailLoading = false;
        draft.confirmEmailError = action.error;
        break;
      case CONFIRM_PASSWORD_AUTH_EMAIL_REQUEST:
        draft.passwordConfirmEmailLoading = true;
        draft.passwordConfirmEmail = null;
        draft.passwordConfirmEmailError = null;
        break;
      case CONFIRM_PASSWORD_AUTH_EMAIL_SUCCESS:
        draft.passwordConfirmEmailLoading = false;
        draft.passwordConfirmEmail = action.data; // 성공하면 ''이 들어옴
        draft.passwordConfirmEmailError = null;
        break;
      case CONFIRM_PASSWORD_AUTH_EMAIL_FAILURE:
        draft.passwordConfirmEmailLoading = false;
        draft.passwordConfirmEmailError = action.error;
        break;
      case SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_REQUEST:
        draft.passwordEmailAuthLoading = true;
        draft.passwordEmailAuth = null;
        draft.passwordEmailAuthError = null;
        break;
      case SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_SUCCESS:
        draft.passwordEmailAuthLoading = false;
        draft.passwordEmailAuth = action.data;
        draft.passwordEmailAuthError = null;
        break;
      case SEND_AUTH_EMAIL_FOR_PASSWORD_CHANGE_FAILURE:
        draft.passwordEmailAuthLoading = false;
        draft.passwordEmailAuthError = action.error;
        break;
      case CHANGE_PASSWORD_REQUEST:
        draft.passwordChangeLoading = true;
        draft.passwordChange = null;
        draft.passwordChangeError = null;
        break;
      case CHANGE_PASSWORD_SUCCESS:
        draft.passwordChangeLoading = false;
        draft.passwordChange = action.data;
        draft.passwordChangeError = null;
        break;
      case CHANGE_PASSWORD_FAILURE:
        draft.passwordChangeLoading = false;
        draft.passwordChangeError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
