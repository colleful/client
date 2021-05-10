import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
  START_LOADING,
  requestType => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  requestType => requestType
);

const initialState = {
  isLoading: false,
};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
      isLoading: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
      isLoading: false,
    })
  },
  initialState
);

export default loading;

// import produce from 'immer';

// export const initialState = {
//   isLoading: false,
// };

// export const START_LOADING = 'START_LOADING';
// export const FINISH_LOADING = 'FINISH_LOADING';

// export const startLoading = () => ({
//   type: START_LOADING,
// });

// export const finishLoading = () => ({
//   type: FINISH_LOADING,
// });

// const reducer = (state = initialState, action) => {
//   produce(state, (draft) => {
//     switch (action.type) {
//       case START_LOADING:
//         draft.isLoading = true;
//         break;
//       case FINISH_LOADING:
//         draft.isLoading = false;
//         break;
//     }
//   });
// };

// export default reducer;
