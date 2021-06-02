import produce from 'immer';

const initialState = {
  departmentData: [],
  collegeData: [],
  getDepartmentLoading: false,
  getDepartmentDone: false,
  getDepartmentError: null,
};
export const GET_DEPARTMENT_REQUEST = 'GET_DEPARTMENT_REQUEST';
export const GET_DEPARTMENT_SUCCESS = 'GET_DEPARTMENT_SUCCESS';
export const GET_DEPARTMENT_FAILURE = 'GET_DEPARTMENT_FAILURE';

export const INITAILIZE_STATE = 'INITAILIZE_STATE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_DEPARTMENT_REQUEST:
        draft.getDepartmentLoading = true;
        draft.getDepartmentDone = false;
        draft.getDepartmentError = null;
        break;
      case GET_DEPARTMENT_SUCCESS:
        draft.getDepartmentLoading = false;
        draft.getDepartmentDone = true;
        draft.departmentData = action.data;
        draft.collegeData = [...new Set(action.data.map((v) => v.collegeName))];
        draft.getDepartmentError = null;
        break;
      case GET_DEPARTMENT_FAILURE:
        draft.getDepartmentLoading = false;
        draft.getDepartmentDone = false;
        draft.getDepartmentError = action.error;
        break;

      case INITAILIZE_STATE:
        Object.keys(draft).map((v) => (draft[v] = initialState[v]));
        break;
      default:
        break;
    }
  });
export default reducer;
