import 'normalize.css/normalize.css';
import 'assets/stylesheets/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from 'store';

import AuthContainer from 'components/current-user/auth-container';


render(
  <Provider store={ store }>
    <MuiThemeProvider>
      <Router history={ browserHistory }>
        <Route path="/signup" name="signup" component={ AuthContainer } />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
