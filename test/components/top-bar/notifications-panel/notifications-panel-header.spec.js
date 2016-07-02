import { shallow } from 'enzyme';
import { assign as _assign } from 'lodash';

import NotificationsPanelHeader from 'components/top-bar/notifications-panel/notifications-panel-header';
import NotificationsCount from 'components/top-bar/notifications-count';

let wrapper;

const setup = (options = {}) => {
  const props = _assign({
    onHide: jasmine.createSpy(),
    notificationsCount: 4
  }, options);

  wrapper = shallow(<NotificationsPanelHeader { ...props } />);
};

const should = {
  notRenderNotificationsCount: () => expect(wrapper.find(NotificationsCount).length).toBe(0),
  renderNotificationsCount: () => expect(wrapper.find(NotificationsCount).length).toBe(1),
  callOnHide: () => expect(wrapper.instance().props.onHide).toHaveBeenCalled()
};

const teardown    = () => wrapper.unmount();
const clickOnHide = () => wrapper.find('.notifications-hide-button').simulate('click');

describe('<NotificationsPanelHeader />', () => {
  afterEach(teardown);

  it('should not render if no notificationsCount', () => {
    [0, null].forEach((option) => {
      setup({ notificationsCount: option });
      should.notRenderNotificationsCount();
    });
  });

  it('should render if there is notificationsCount', () => {
    setup();
    should.renderNotificationsCount();
  });

  it('should call for onHide on hide button click', () => {
    setup();
    clickOnHide();
    should.callOnHide();
  });
});
