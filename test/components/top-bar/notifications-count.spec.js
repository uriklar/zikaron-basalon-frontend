import { shallow } from 'enzyme';
import { assign as _assign } from 'lodash';

import NotificationsCount from 'components/top-bar/notifications-count';

let wrapper;

const setup = (options = {}) => {
  const props = _assign({ count: null }, options);

  wrapper = shallow(<NotificationsCount { ...props } />);
};

const should = {
  renderNotificationsCount: () => expect(wrapper.node).not.toEqual(null),
  notRenderNotificationsCount: () => expect(wrapper.node).toEqual(null)
};

describe('<NotificationsCount />', () => {
  it('should render NotificationsCount', () => {
    setup({ count: 1 });
    should.renderNotificationsCount();
  });

  it('should not render NotificationsCount if no count', () => {
    [null, 0].forEach((count) => {
      setup({ count });
      should.notRenderNotificationsCount();
    });
  });
});
