import produce from 'immer';

const initialState = {
  userInfo: {},

  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
};

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

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

      case INITAILIZE_STATE:
        Object.keys(draft).map((v) => (draft[v] = initialState[v]));
        // 하나하나씩 초기화 해주는 방법, 결국 initialState를 초기화 시켜주는 방법이다.
        break;
      default:
        break;
    }
  });
export default reducer;
