import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import invite from './invite';
import team from './team';

const rootReducer = combineReducers({
  auth,
  user,
  invite,
  team,
});

export default rootReducer;
