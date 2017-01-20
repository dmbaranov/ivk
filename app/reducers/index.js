import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import * as con from 'app/constants/auth';
import auth from './auth';
import profile from './profile';
import longPoll from './long-poll';

const appReducer = combineReducers({
  auth,
  profile,
  longPoll,
  routing
});

const rootReducer = (state, action) => {
  if (action.type === con.LOGOUT_USER) {
    // Here we clear the state of all app
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
