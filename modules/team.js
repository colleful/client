import {createAction, handleActions} from 'redux-actions';
import * as authAPI from '../lib/api';

//액션 타입 정의
const GET_TEAM_PENDING = 'team/GET_TEAM_PENDING';
const GET_TEAM_SUCCESS = 'team/GET_TEAM_SUCCESS';
const GET_TEAM_FAILURE = 'team/GET_TEAM_FAILURE';

//액션 함수 생성
export const getTeam = () => async (dispatch) => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({type: GET_TEAM_PENDING});
  try {
    const response = await authAPI.getTeam();
    dispatch({
      type: GET_TEAM_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_TEAM_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

const initialState = {
  loading: {
    GET_TEAM_PENDING: false,
  },
  teams: null,
};
//리듀서
export default handleActions(
  {
    [GET_TEAM_PENDING]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_TEAM_PENDING: true,
      },
    }),
    [GET_TEAM_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_TEAM_PENDING: false,
      },
      teams: action.payload,
    }),
    [GET_TEAM_FAILURE]: (state) => ({
      ...state,
      loading: {
        ...state,
        loading,
        GET_TEAM_PENDING: false,
      },
    }),
  },
  initialState,
);
