import produce from 'immer';

const initialState = {
  acceptInvitationLoading: false,
  acceptInvitationDone: false,
  acceptInvitationError: null,
  
  refuseInvitationLoading: false,
  refuseInvitationDone: false,
  refuseInvitationError: null,
};
export const ACCEPT_INVITATION_REQUEST = 'ACCEPT_INVITATION_REQUEST';
export const ACCEPT_INVITATION_SUCCESS = 'ACCEPT_INVITATION_SUCCESS';
export const ACCEPT_INVITATION_FAILURE = 'ACCEPT_INVITATION_FAILURE';
export const REFUSE_INVITATION_REQUEST = 'REFUSE_INVITATION_REQUEST';
export const REFUSE_INVITATION_SUCCESS = 'REFUSE_INVITATION_SUCCESS';
export const REFUSE_INVITATION_FAILURE = 'REFUSE_INVITATION_FAILURE';

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
        break;
      default:
        break;
    }
  });
export default reducer;
