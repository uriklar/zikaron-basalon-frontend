import { get } from 'lodash';
import Signup from 'components/current-user/signup';

const AuthContainer = ({ routes }) => {
  let Child;

  switch (get(routes, [0, 'name'])) {
    case 'signup': Child = Signup; break;
    default: Child = Signup;
  }

  return (
    <div className="auth-container">
      <div className="form-container">
        <form>
          <Child />
        </form>
      </div>
    </div>
  );
};

export default AuthContainer;
