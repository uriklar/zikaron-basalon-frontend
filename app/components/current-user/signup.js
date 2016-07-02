import { connect } from 'react-redux';
import { PropTypes } from 'react';
import { isEmpty, keys, map, assign } from 'lodash';

import { signUp as _signUp } from 'actions/current-user';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ERROR_MESSAGES } from 'constants/config';

const FIELD_META_DATA = {
  firstName: { placeholder: 'First Name', type: 'text' },
  lastName: { placeholder: 'Last Name', type: 'text' },
  email: { placeholder: 'Email', type: 'email' },
  phone: { placeholder: 'Phone', type: 'phone' },
  password: { placeholder: 'Password', type: 'password' },
  passwordConfirmation: { placeholder: 'Password Confirmation', type: 'password' }
};

class Signup extends React.Component {
  render() {
    return (
      <div>
        <h1>Signup</h1>

        {
          map(keys(this.state.user), (key) => {
            return (
              <div>
                <TextField hintText={ FIELD_META_DATA[key].placeholder }
                           type={ FIELD_META_DATA[key].type }
                           ref={ key }
                           key={ key }
                           errorText={ this.state.errors[key] }
                           onChange={ (event) => this.onFieldChange(key, event) }
                           onBlur={ (event) => this.onFieldBlur(key, event) }/>
              </div>
            );
          })
        }

        <div>
          <RaisedButton label="Signup" primary={ true } />
        </div>
      </div>
    );
  }

  static get propTypes() {
    const { func } = PropTypes;

    return {
      signUp: func.isRequired
    };
  }

  constructor() {
    super();

    this.state = {
      user: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        password: null,
        passwordConfirmation: null
      },
      errors: {}
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.onFieldBlur = this.onFieldBlur.bind(this);
    this.getErrors = this.getErrors.bind(this);
  }

  getErrors(field, value) {
    const errors = {
      [field]: isEmpty(value) ? ERROR_MESSAGES.REQUIRED : null
    };

    if (field === 'passwordConfirmation') {
      assign(errors, {
        passwordConfirmation: value === this.state.user.password ? null : ERROR_MESSAGES.NO_MATCH
      });
    }

    return errors;

  }


  onFieldChange(field, event) {
    this.setState({ user: assign(this.state.user, { [field]: event.target.value }) });
  }

  onFieldBlur(field, event) {
    this.setState({
      errors: assign(this.state.errors, this.getErrors(field, event.target.value))
    });
  }
}

export default connect(null, {
  signUp: _signUp
})(Signup);
