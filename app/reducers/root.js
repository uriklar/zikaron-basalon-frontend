import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import currentUser from 'reducers/current-user';
import { SIGN_OUT } from 'constants/action-types';

const rootReducer = combineReducers({
  routing: routeReducer,
  currentUser
});

/* eslint-disable no-undefined */
// Reset to initial state on sign out
export default (state, action) => {
  const currentState = action.type === SIGN_OUT.PENDING ? undefined : state;

  return rootReducer(currentState, action);
};
