import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import invite from './invite';
import team from './team';
import matching from './matching';
import department from './department';

const rootReducer = combineReducers({
  auth,
  user,
  invite,
  team,
  matching,
  department,
});

export default rootReducer;
