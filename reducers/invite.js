import produce from 'immer';

const initialState = {
  searchUserInfo: [],

  acceptInvitationLoading: false,
  acceptInvitationDone: false,
  acceptInvitationError: null,

  refuseInvitationLoading: false,
  refuseInvitationDone: false,
  refuseInvitationError: null,

  searchUserByNicknameLoading: false, // user 컴포넌트에 들어가는게 맞는데 이걸 이용해서 inviteTeam에서 body로 넘겨줘야함
  searchUserByNicknameDone: false,
  searchUserByNicknameError: null,

  inviteTeamLoading: false,
  inviteTeamDone: false,
  inviteTeamError: null,
};
export const ACCEPT_INVITATION_REQUEST = 'ACCEPT_INVITATION_REQUEST';
export const ACCEPT_INVITATION_SUCCESS = 'ACCEPT_INVITATION_SUCCESS';
export const ACCEPT_INVITATION_FAILURE = 'ACCEPT_INVITATION_FAILURE';

export const REFUSE_INVITATION_REQUEST = 'REFUSE_INVITATION_REQUEST';
export const REFUSE_INVITATION_SUCCESS = 'REFUSE_INVITATION_SUCCESS';
export const REFUSE_INVITATION_FAILURE = 'REFUSE_INVITATION_FAILURE';

export const SEARCH_USER_BY_NICKNAME_REQUEST =
  'SEARCH_USER_BY_NICKNAME_REQUEST';
export const SEARCH_USER_BY_NICKNAME_SUCCESS =
  'SEARCH_USER_BY_NICKNAME_SUCCESS';
export const SEARCH_USER_BY_NICKNAME_FAILURE =
  'SEARCH_USER_BY_NICKNAME_FAILURE';

export const INVITE_TEAM_REQUEST = 'INVITE_TEAM_REQUEST';
export const INVITE_TEAM_SUCCESS = 'INVITE_TEAM_SUCCESS';
export const INVITE_TEAM_FAILURE = 'INVITE_TEAM_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACCEPT_INVITATION_REQUEST:
        draft.acceptInvitationLoading = true;
        draft.acceptInvitationDone = false;
        draft.acceptInvitationError = null;
        break;
      case ACCEPT_INVITATION_SUCCESS:
        draft.acceptInvitationLoading = false;
        draft.acceptInvitationDone = true;
        draft.acceptInvitationError = null;
        break;
      case ACCEPT_INVITATION_FAILURE:
        draft.acceptInvitationLoading = false;
        draft.acceptInvitationDone = false;
        draft.acceptInvitationError = action.error;
        break;

      case REFUSE_INVITATION_REQUEST:
        draft.refuseInvitationLoading = true;
        draft.refuseInvitationDone = false;
        draft.refuseInvitationError = null;
        break;
      case REFUSE_INVITATION_SUCCESS:
        draft.refuseInvitationLoading = false;
        draft.refuseInvitationDone = true;
        draft.refuseInvitationError = null;
        break;
      case REFUSE_INVITATION_FAILURE:
        draft.refuseInvitationLoading = false;
        draft.refuseInvitationDone = false;
        draft.refuseInvitationError = action.error;

      case SEARCH_USER_BY_NICKNAME_REQUEST:
        draft.searchUserByNicknameLoading = true;
        draft.searchUserByNicknameDone = false;
        draft.searchUserByNicknameError = null;
        break;
      case SEARCH_USER_BY_NICKNAME_SUCCESS:
        draft.searchUserByNicknameLoading = false;
        draft.searchUserByNicknameDone = true;
        draft.searchUserInfo = action.data;
        draft.searchUserByNicknameError = null;
        break;
      case SEARCH_USER_BY_NICKNAME_FAILURE:
        draft.searchUserByNicknameLoading = false;
        draft.searchUserByNicknameDone = false;
        draft.searchUserByNicknameError = action.error;

      case INVITE_TEAM_REQUEST:
        draft.inviteTeamLoading = true;
        draft.inviteTeamDone = false;
        draft.inviteTeamError = null;
        break;
      case INVITE_TEAM_SUCCESS:
        draft.inviteTeamLoading = false;
        draft.inviteTeamDone = true;
        draft.inviteTeamError = null;
        break;
      case INVITE_TEAM_FAILURE:
        draft.inviteTeamLoading = false;
        draft.inviteTeamDone = false;
        draft.inviteTeamError = action.error;
        break;
      default:
        break;
    }
  });
export default reducer;
