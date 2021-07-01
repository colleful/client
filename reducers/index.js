import {combineReducers} from 'redux';
import authentication from './authentication';
import user from './user';
import invite from './invite';
import team from './team';
import matching from './matching';
import department from './department';

const rootReducer = combineReducers({
  authentication,
  user,
  invite,
  team,
  matching,
  department,
});

export default rootReducer;
