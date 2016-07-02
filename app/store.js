import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import Immutable from 'seamless-immutable';
import persistState from 'redux-localstorage';
import rootReducer from 'reducers/root';
import apiMiddleware from 'middleware/api';


const middlewares = [
  syncHistory(browserHistory),
  apiMiddleware,
];

/* eslint-disable no-undef, global-require */
if ($_ENVIRONMENT === 'development') {
  const createLogger = require('redux-logger');

  middlewares.push(createLogger({ collapsed: true }));
}
/* eslint-enable no-undef, global-require */

const persistStateConfig = {
  key: 'ZikaronBasalon',
  slicer: () => (state) => {
    return { currentUser: state.currentUser };
  },
  deserialize: (state) => Immutable(JSON.parse(state))
};

const storeEnhancers = compose(
  persistState(null, persistStateConfig),
  applyMiddleware(...middlewares)
);

const store = createStore(rootReducer, storeEnhancers);

/* eslint-disable no-undef */
if ($_ENVIRONMENT === 'development') {
  window.store = store;
}
/* eslint-enable no-undef */

export default store;
