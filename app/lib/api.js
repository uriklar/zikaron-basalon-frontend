/* eslint-disable camelcase */
// We want to use only one web worker instance for all requests,
// thus we need to store the promise handlers outside, so the onmessage
// handler will know what Promise handler to execute.
// For this we create a unique id for each request, store it in cached map
// and save response and reject handlers to it until the promise resolved
let requestId = 0;
const cachedPromiseHandlers = {};

import RequestWorker from 'worker!web-workers/request-worker';
const requestWorker = new RequestWorker();

requestWorker.onmessage = (response) => {
  const { resolve, reject } = cachedPromiseHandlers[response.data.requestId];

  if (response.data.error) {
    reject(response.data.error);
  }

  if (response.data.success) {
    resolve(response.data.success);
  }

  delete cachedPromiseHandlers[requestId];
};

function performRequest({ authToken, url, method, params }) {
  return new Promise((resolve, reject) => {
    cachedPromiseHandlers[requestId] = { resolve, reject };
    requestWorker.postMessage({ requestId, authToken, url, method, params });
    requestId += 1;
  });
}

const handleCurrentUserResponse = (response) => ({
  status: response.status,
  user: {
    authToken: response.api_token,
    firstName: response.user.first_name,
    lastName: response.user.last_name,
    email: response.user.email,
  }
});

export default class API {

  static login(authToken, { email, password }) {
    return performRequest({
      authToken,
      url: '/users/sign_in.json',
      method: 'post',
      params: { user: { email, password } }
    }).then(handleCurrentUserResponse);
  }

  static logout(authToken) {
    return performRequest({
      authToken,
      url: '/users/sign_out',
      method: 'delete'
    });
  }

  static forgotPassword(authToken, { email }) {
    return performRequest({
      authToken,
      url: '/users/password.json',
      method: 'post',
      params: { user: { email } }
    });
  }

  static resetPassword(authToken, { token, password, passwordConfirmation }) {
    return performRequest({
      authToken,
      url: '/users/password.json',
      method: 'put',
      params: {
        user: {
          password,
          password_confirmation: passwordConfirmation,
          reset_password_token: token
        }
      }
    });
  }
}
