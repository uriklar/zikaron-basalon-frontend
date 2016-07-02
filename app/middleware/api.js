import { createAction } from 'redux-actions';
import { API_REQUEST } from 'constants/action-types';
import API from 'lib/api';

function createErrorAction(dispatch, response, nextAction) {
  // Catch silent failures in promises
  if (response instanceof Error) {
    throw response;
  }

  dispatch(
    nextAction(new Error(
      response instanceof TypeError
        ? response
        : JSON.stringify(response)
    ))
  );
}

export default function apiMiddleware({ dispatch, getState }) {
  return (next) => (action) => {
    if (action.type !== API_REQUEST) {
      return next(action);
    }

    const { apiMethod, parameters, nextActionType } = action.payload;
    const pending = createAction(nextActionType.PENDING, null, () => action.payload.parameters);
    const success = createAction(nextActionType.SUCCESS, null, () => action.payload.parameters);
    const failure = createAction(nextActionType.FAILURE, null, () => action.payload.parameters);

    API[apiMethod](getState().currentUser.authToken, parameters)
      .then((response) => dispatch(success(response)))
      .catch((response) => createErrorAction(dispatch, response, failure));

    return next(pending());
  };
}
