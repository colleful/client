import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import invite from './invite';

const rootReducer = combineReducers({
  auth,
  user,
  invite,
});

export default rootReducer;
