import produce from 'immer';

const initialState = {
  changeTeamStatusReadyLoading: false,
  changeTeamStatusReadyDone: false,
  changeTeamStatusReadyError: null,

  changeTeamStatusWatchingLoading: false,
  changeTeamStatusWatchingDone: false,
  changeTeamStatusWatchingError: null,

  finishTeamMatchingLoading: false,
  finishTeamMatchingDone: false,
  finishTeamMatchingError: null,

  deleteTeamLoading: false,
  deleteTeamDone: false,
  deleteTeamError: null,

  exitTeamLoading: false,
  exitTeamDone: false,
  exitTeamError: null,

  createTeamLoading: false,
  createTeamDone: false,
  createTeamError: null,

  readyTeamList: [],
  getReadyTeamLoading: false,
  getReadyTeamDone: false,
  getReadyTeamError: null,
};
export const CHANGE_TEAM_STATUS_READY_REQUEST =
  'CHANGE_TEAM_STATUS_READY_REQUEST';
export const CHANGE_TEAM_STATUS_READY_SUCCESS =
  'CHANGE_TEAM_STATUS_READY_SUCCESS';
export const CHANGE_TEAM_STATUS_READY_FAILURE =
  'CHANGE_TEAM_STATUS_READY_FAILURE';

export const CHANGE_TEAM_STATUS_WATCHING_REQUEST =
  'CHANGE_TEAM_STATUS_WATCHING_REQUEST';
export const CHANGE_TEAM_STATUS_WATCHING_SUCCESS =
  'CHANGE_TEAM_STATUS_WATCHING_SUCCESS';
export const CHANGE_TEAM_STATUS_WATCHING_FAILURE =
  'CHANGE_TEAM_STATUS_WATCHING_FAILURE';

export const FINISH_TEAM_MATCHING_REQUEST = 'FINISH_TEAM_MATCHING_REQUEST';
export const FINISH_TEAM_MATCHING_SUCCESS = 'FINISH_TEAM_MATCHING_SUCCESS';
export const FINISH_TEAM_MATCHING_FAILURE = 'FINISH_TEAM_MATCHING_FAILURE';

export const DELETE_TEAM_REQUEST = 'DELETE_TEAM_REQUEST';
export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_FAILURE = 'DELETE_TEAM_FAILURE';

export const EXIT_TEAM_REQUEST = 'EXIT_TEAM_REQUEST';
export const EXIT_TEAM_SUCCESS = 'EXIT_TEAM_SUCCESS';
export const EXIT_TEAM_FAILURE = 'EXIT_TEAM_FAILURE';

export const CREATE_TEAM_REQUEST = 'CREATE_TEAM_REQUEST';
export const CREATE_TEAM_SUCCESS = 'CREATE_TEAM_SUCCESS';
export const CREATE_TEAM_FAILURE = 'CREATE_TEAM_FAILURE';

export const GET_READY_TEAM_REQUEST = 'GET_READY_TEAM_REQUEST';
export const GET_READY_TEAM_SUCCESS = 'GET_READY_TEAM_SUCCESS';
export const GET_READY_TEAM_FAILURE = 'GET_READY_TEAM_FAILURE';

export const CHANGE_VALUE = 'CHANGE_VALUE';
export const INITAILIZE_STATE = 'INITAILIZE_STATE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_TEAM_STATUS_READY_REQUEST:
        draft.changeTeamStatusReadyLoading = true;
        draft.changeTeamStatusReadyDone = false;
        draft.changeTeamStatusReadyError = null;
        break;
      case CHANGE_TEAM_STATUS_READY_SUCCESS:
        draft.changeTeamStatusReadyLoading = false;
        draft.changeTeamStatusReadyDone = true;
        draft.changeTeamStatusReadyError = null;
        break;
      case CHANGE_TEAM_STATUS_READY_FAILURE:
        draft.changeTeamStatusReadyLoading = false;
        draft.changeTeamStatusReadyDone = false;
        draft.changeTeamStatusReadyError = action.error;
        break;

      case CHANGE_TEAM_STATUS_WATCHING_REQUEST:
        draft.changeTeamStatusWatchingLoading = true;
        draft.changeTeamStatusWatchingDone = false;
        draft.changeTeamStatusWatchingError = null;
        break;
      case CHANGE_TEAM_STATUS_WATCHING_SUCCESS:
        draft.changeTeamStatusWatchingLoading = false;
        draft.changeTeamStatusWatchingDone = true;
        draft.changeTeamStatusWatchingError = null;
        break;
      case CHANGE_TEAM_STATUS_WATCHING_FAILURE:
        draft.changeTeamStatusWatchingLoading = false;
        draft.changeTeamStatusWatchingDone = false;
        draft.changeTeamStatusWatchingError = action.error;
        break;

      case FINISH_TEAM_MATCHING_REQUEST:
        draft.finishTeamMatchingLoading = true;
        draft.finishTeamMatchingDone = false;
        draft.finishTeamMatchingError = null;
        break;
      case FINISH_TEAM_MATCHING_SUCCESS:
        draft.finishTeamMatchingLoading = false;
        draft.finishTeamMatchingDone = true;
        draft.finishTeamMatchingError = null;
        break;
      case FINISH_TEAM_MATCHING_FAILURE:
        draft.finishTeamMatchingLoading = false;
        draft.finishTeamMatchingDone = false;
        draft.finishTeamMatchingError = action.error;
        break;

      case DELETE_TEAM_REQUEST:
        draft.deleteTeamLoading = true;
        draft.deleteTeamDone = false;
        draft.deleteTeamError = null;
        break;
      case DELETE_TEAM_SUCCESS:
        draft.deleteTeamLoading = false;
        draft.deleteTeamDone = true;
        draft.deleteTeamError = null;
        break;
      case DELETE_TEAM_FAILURE:
        draft.deleteTeamLoading = false;
        draft.deleteTeamDone = false;
        draft.deleteTeamError = action.error;
        break;

      case EXIT_TEAM_REQUEST:
        draft.exitTeamLoading = true;
        draft.exitTeamDone = false;
        draft.exitTeamError = null;
        break;
      case EXIT_TEAM_SUCCESS:
        draft.exitTeamLoading = false;
        draft.exitTeamDone = true;
        draft.exitTeamError = null;
        break;
      case EXIT_TEAM_FAILURE:
        draft.exitTeamLoading = false;
        draft.exitTeamDone = false;
        draft.exitTeamError = action.error;
        break;

      case CREATE_TEAM_REQUEST:
        draft.createTeamLoading = true;
        draft.createTeamDone = false;
        draft.createTeamError = null;
        break;
      case CREATE_TEAM_SUCCESS:
        draft.createTeamLoading = false;
        draft.createTeamDone = true;
        draft.createTeamError = null;
        break;
      case CREATE_TEAM_FAILURE:
        draft.createTeamLoading = false;
        draft.createTeamDone = false;
        draft.createTeamError = action.error;
        break;

      case GET_READY_TEAM_REQUEST:
        draft.getReadyTeamLoading = true;
        draft.getReadyTeamDone = false;
        draft.getReadyTeamError = null;
        break;
      case GET_READY_TEAM_SUCCESS:
        draft.getReadyTeamLoading = false;
        draft.getReadyTeamDone = true;
        draft.readyTeamList = action.data;
        draft.getReadyTeamError = null;
        break;
      case GET_READY_TEAM_FAILURE:
        draft.getReadyTeamLoading = false;
        draft.getReadyTeamDone = false;
        draft.getReadyTeamError = action.error;
        break;

      case CHANGE_VALUE:
        draft[action.key] = action.value;
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
