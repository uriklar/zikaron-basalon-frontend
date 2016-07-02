/* eslint-disable camelcase, no-undef */
import request from 'superagent';
import { BASE_URL, BAD_REQUEST, NO_CONTENT, STAGING_BASE_URL } from 'constants/config';
import { assign } from 'lodash';

function buildQueryParams(params = {}) {
  const pairs = Object.keys(params)
    .reduce((result, name) => {
      let value = params[name];

      if (Array.isArray(value)) {
        value = value.join(',');
      }

      return result.concat(`${name}=${value}`);
    }, []);

  return pairs.length ? `?${pairs.join('&')}` : '';
}

function performRequest({ requestId, authToken, url, method, params }) {
  let requestUrl      = `${$_ENVIRONMENT === 'production' ? BASE_URL : STAGING_BASE_URL}${url}`;
  let requestBody     = null;
  const headers = {};

  if (method === 'get') {
    requestUrl += buildQueryParams(params);
  } else {
    requestBody = JSON.stringify(params);
  }

  if (authToken) {
    assign(headers, { Authorization: `Token token=${authToken}` });
  }

  request(method, requestUrl)
    .type('json')
    .set(headers)
    .send(requestBody)
    .end((error, response) => {
      if (response.status === NO_CONTENT) {
        return postMessage({ requestId, success: {} });
      }

      return error || response.status >= BAD_REQUEST
        ? postMessage({ requestId, error: response.body })
        : postMessage({ requestId, success: response.body });
    });
}

onmessage = (params) => performRequest(params.data);
