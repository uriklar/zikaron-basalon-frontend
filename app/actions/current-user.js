import {
  SET_CURRENT_USER,
  SIGN_OUT,
  RESET_PASSWORD,
  SET_NEW_PASSWORD,
  API_REQUEST
} from 'constants/action-types';

export const signUp = (user) => ({
  type: API_REQUEST,
  payload: {
    apiMethod: 'signup',
    parameters: { user },
    nextActionType: SET_CURRENT_USER
  }
});

export const signIn = (email, password) => ({
  type: API_REQUEST,
  payload: {
    apiMethod: 'login',
    parameters: { email, password },
    nextActionType: SET_CURRENT_USER
  }
});

export const signOut = () => ({
  type: API_REQUEST,
  payload: {
    apiMethod: 'logout',
    nextActionType: SIGN_OUT
  }
});

export const forgotPassword = (email) => ({
  type: API_REQUEST,
  payload: {
    apiMethod: 'forgotPassword',
    parameters: { email },
    nextActionType: RESET_PASSWORD
  }
});

export const resetPassword = (token, password, passwordConfirmation) => ({
  type: API_REQUEST,
  payload: {
    apiMethod: 'resetPassword',
    parameters: { token, password, passwordConfirmation },
    nextActionType: SET_NEW_PASSWORD
  }
});


