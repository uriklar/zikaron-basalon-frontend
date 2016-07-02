import { createAsyncActionTypes } from 'lib/create-async-action-types';

// API
export const API_REQUEST = 'API_REQUEST';

// Current user
export const SIGN_UP          = createAsyncActionTypes('SIGN_UP');
export const SET_CURRENT_USER = createAsyncActionTypes('SET_CURRENT_USER');
export const SIGN_OUT         = createAsyncActionTypes('SIGN_OUT');
export const RESET_PASSWORD   = createAsyncActionTypes('RESET_PASSWORD');
export const SET_NEW_PASSWORD = createAsyncActionTypes('SET_NEW_PASSWORD');
