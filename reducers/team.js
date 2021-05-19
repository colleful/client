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
};
export const CHANGE_TEAM_STATUS_READY_REQUEST =
  'CHANGE_TEAM_STATUS_READY_REQUEST';
export const CHANGE_TEAM_STATUS_READY_SUCCESS =
  'CHANGE_TEAM_STATUS_READY_SUCCESS';
export const CHANGE_TEAM_STATUS_READY_FAILURE =
  'CHANGE_TEAM_STATUS_READY_FAILURE';
export const CHANGE_TEAM_STATUS_READY_INITIALIZE =
  'CHANGE_TEAM_STATUS_READY_INITIALIZE';

export const CHANGE_TEAM_STATUS_WATCHING_REQUEST =
  'CHANGE_TEAM_STATUS_WATCHING_REQUEST';
export const CHANGE_TEAM_STATUS_WATCHING_SUCCESS =
  'CHANGE_TEAM_STATUS_WATCHING_SUCCESS';
export const CHANGE_TEAM_STATUS_WATCHING_FAILURE =
  'CHANGE_TEAM_STATUS_WATCHING_FAILURE';
export const CHANGE_TEAM_STATUS_WATCHING_INITIALIZE =
  'CHANGE_TEAM_STATUS_WATCHING_INITIALIZE';

export const FINISH_TEAM_MATCHING_REQUEST = 'FINISH_TEAM_MATCHING_REQUEST';
export const FINISH_TEAM_MATCHING_SUCCESS = 'FINISH_TEAM_MATCHING_SUCCESS';
export const FINISH_TEAM_MATCHING_FAILURE = 'FINISH_TEAM_MATCHING_FAILURE';
export const FINISH_TEAM_MATCHING_INITIALIZE =
  'FINISH_TEAM_MATCHING_INITIALIZE';

export const DELETE_TEAM_REQUEST = 'DELETE_TEAM_REQUEST';
export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_FAILURE = 'DELETE_TEAM_FAILURE';

export const EXIT_TEAM_REQUEST = 'EXIT_TEAM_REQUEST';
export const EXIT_TEAM_SUCCESS = 'EXIT_TEAM_SUCCESS';
export const EXIT_TEAM_FAILURE = 'EXIT_TEAM_FAILURE';

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
      case CHANGE_TEAM_STATUS_READY_INITIALIZE:
        draft.changeTeamStatusReadyLoading = false;
        draft.changeTeamStatusReadyDone = false;
        draft.changeTeamStatusReadyError = null;
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
      case CHANGE_TEAM_STATUS_WATCHING_INITIALIZE:
        draft.changeTeamStatusWatchingLoading = false;
        draft.changeTeamStatusWatchingDone = false;
        draft.changeTeamStatusWatchingError = null;
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
      case FINISH_TEAM_MATCHING_INITIALIZE:
        draft.finishTeamMatchingLoading = false;
        draft.finishTeamMatchingDone = false;
        draft.finishTeamMatchingError = null;
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
      default:
        break;
    }
  });
export default reducer;
