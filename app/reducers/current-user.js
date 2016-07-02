import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import { SET_CURRENT_USER } from 'constants/action-types';

const initialState = Immutable({
  firstName: null,
  lastName: null,
  authToken: null,
  email: null,
  units: null
});

const currentUserReducer = handleActions({
  [SET_CURRENT_USER.SUCCESS](state, action) {
    return state.merge(action.payload.user);
  }
}, initialState);

export default currentUserReducer;
