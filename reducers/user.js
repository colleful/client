import produce from 'immer';

const initialState = {
  userInfo: {},

  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,

  changeUserInfoLoading: false,
  changeUserInfoDone: false,
  changeUserInfoError: null,

  deleteUserLoading: false,
  deleteUserDone: false,
  deleteUserError: null,

  changeUserPasswordLoading: false,
  changeUserPasswordDone: false,
  changeUserPasswordError: null,
};

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const CHANGE_USER_INFO_REQUEST = 'CHANGE_USER_INFO_REQUEST';
export const CHANGE_USER_INFO_SUCCESS = 'CHANGE_USER_INFO_SUCCESS';
export const CHANGE_USER_INFO_FAILURE = 'CHANGE_USER_INFO_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const CHANGE_USER_PASSWORD_REQUEST = 'CHANGE_USER_PASSWORD_REQUEST';
export const CHANGE_USER_PASSWORD_SUCCESS = 'CHANGE_USER_PASSWORD_SUCCESS';
export const CHANGE_USER_PASSWORD_FAILURE = 'CHANGE_USER_PASSWORD_FAILURE';

export const INITAILIZE_STATE = 'INITAILIZE_STATE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.userInfo = action.data;
        draft.loadUserError = null;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserDone = false;
        draft.loadUserError = action.error;
        break;

      case CHANGE_USER_INFO_REQUEST:
        draft.changeUserInfoLoading = true;
        draft.changeUserInfoDone = false;
        draft.changeUserInfoError = null;
        break;
      case CHANGE_USER_INFO_SUCCESS:
        draft.changeUserInfoLoading = false;
        draft.changeUserInfoDone = true;
        draft.changeUserInfoError = null;
        break;
      case CHANGE_USER_INFO_FAILURE:
        draft.changeUserInfoLoading = false;
        draft.changeUserInfoDone = false;
        draft.changeUserInfoError = action.error;
        break;

      case CHANGE_USER_PASSWORD_REQUEST:
        draft.changeUserPasswordLoading = true;
        draft.changeUserPasswordDone = false;
        draft.changeUserPasswordError = null;
        break;
      case CHANGE_USER_PASSWORD_SUCCESS:
        draft.changeUserPasswordLoading = false;
        draft.changeUserPasswordDone = true;
        draft.changeUserPasswordError = null;
        break;
      case CHANGE_USER_PASSWORD_FAILURE:
        draft.changeUserPasswordLoading = false;
        draft.changeUserPasswordDone = false;
        draft.changeUserPasswordError = action.error;
        break;

      case DELETE_USER_REQUEST:
        draft.deleteUserLoading = true;
        draft.deleteUserDone = false;
        draft.deleteUserError = null;
        break;
      case DELETE_USER_SUCCESS:
        draft.deleteUserLoading = false;
        draft.deleteUserDone = true;
        draft.deleteUserError = null;
        break;
      case DELETE_USER_FAILURE:
        draft.deleteUserLoading = false;
        draft.deleteUserDone = false;
        draft.deleteUserError = action.error;
        break;

      case INITAILIZE_STATE:
        Object.keys(draft).map((v) => (draft[v] = initialState[v]));
        // 하나하나씩 초기화 해주는 방법, 결국 initialState를 초기화 시켜주는 방법이다.
        break;
      default:
        break;
    }
  });
export default reducer;
