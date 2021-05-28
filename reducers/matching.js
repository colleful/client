import produce from 'immer';

const initialState = {
  matcherInfo: [],

  acceptMatchingLoading: false,
  acceptMatchingDone: false,
  acceptMatchingError: null,

  refuseMatchingLoading: false,
  refuseMatchingDone: false,
  refuseMatchingError: null,

  deleteMatchingLoading: false,
  deleteMatchingDone: false,
  deleteMatchingError: null,
};
export const ACCEPT_MATCHING_REQUEST = 'ACCEPT_MATCHING_REQUEST';
export const ACCEPT_MATCHING_SUCCESS = 'ACCEPT_MATCHING_SUCCESS';
export const ACCEPT_MATCHING_FAILURE = 'ACCEPT_MATCHING_FAILURE';

export const REFUSE_MATCHING_REQUEST = 'REFUSE_MATCHING_REQUEST';
export const REFUSE_MATCHING_SUCCESS = 'REFUSE_MATCHING_SUCCESS';
export const REFUSE_MATCHING_FAILURE = 'REFUSE_MATCHING_FAILURE';

export const DELETE_MATCHING_REQUEST = 'DELETE_MATCHING_REQUEST';
export const DELETE_MATCHING_SUCCESS = 'DELETE_MATCHING_SUCCESS';
export const DELETE_MATCHING_FAILURE = 'DELETE_MATCHING_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const INITAILIZE_STATE = 'INITAILIZE_STATE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACCEPT_MATCHING_REQUEST:
        draft.acceptMatchingLoading = true;
        draft.acceptMatchingDone = false;
        draft.acceptMatchingError = null;
        break;
      case ACCEPT_MATCHING_SUCCESS:
        draft.acceptMatchingLoading = false;
        draft.acceptMatchingDone = true;
        draft.acceptMatchingError = null;
        break;
      case ACCEPT_MATCHING_FAILURE:
        draft.acceptMatchingLoading = false;
        draft.acceptMatchingDone = false;
        draft.acceptMatchingError = action.error;
        break;

      case REFUSE_MATCHING_REQUEST:
        draft.refuseMatchingLoading = true;
        draft.refuseMatchingDone = false;
        draft.refuseMatchingError = null;
        break;
      case REFUSE_MATCHING_SUCCESS:
        draft.refuseMatchingLoading = false;
        draft.refuseMatchingDone = true;
        draft.refuseMatchingError = null;
        break;
      case REFUSE_MATCHING_FAILURE:
        draft.refuseMatchingLoading = false;
        draft.refuseMatchingDone = false;
        draft.refuseMatchingError = action.error;
        break;

      case DELETE_MATCHING_REQUEST:
        draft.deleteMatchingLoading = true;
        draft.deleteMatchingDone = false;
        draft.deleteMatchingError = null;
        break;
      case DELETE_MATCHING_SUCCESS:
        draft.deleteMatchingLoading = false;
        draft.deleteMatchingDone = true;
        draft.deleteMatchingError = null;
        break;
      case DELETE_MATCHING_FAILURE:
        draft.deleteMatchingLoading = false;
        draft.deleteMatchingDone = false;
        draft.deleteMatchingError = action.error;
        break;

      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.matcherInfo = action.data;
        draft.loadUserError = null;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserDone = false;
        draft.loadUserError = action.error;
        break;

      case INITAILIZE_STATE:
        Object.keys(draft).map((v) => (draft[v] = initialState[v]));
        // draft['searchUserInfo'] = initialState['searchUserInfo'];
        // draft['acceptInvitationLoading'] = initialState['acceptInvitationLoading'];
        // ... 하나하나씩 초기화 해주는 방법, 결국 initialState를 초기화 시켜주는 방법이다.
        break;
      default:
        break;
    }
  });
export default reducer;
