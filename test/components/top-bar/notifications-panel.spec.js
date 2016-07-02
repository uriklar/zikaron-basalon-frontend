import { shallow } from 'enzyme';
import { noop } from 'test-utils';
import { assign as _assign } from 'lodash';

import NotificationsPanel from 'components/top-bar/notifications-panel';
import NotificationsPanelHeader from 'components/top-bar/notifications-panel/notifications-panel-header';
import NotificationsPanelList from 'components/top-bar/notifications-panel/notifications-panel-list';

let wrapper;

const setup = (options = {}) => {
  const props = _assign({
    hidePanel: noop,
    notifications: [1, 2, 3, 4],
    unstar: noop
  }, options);

  wrapper = shallow(<NotificationsPanel { ...props } />);
};

const should = {
  renderPanelHeader: () => expect(wrapper.find(NotificationsPanelHeader).length).toBe(1),
  renderPanelList: () => expect(wrapper.find(NotificationsPanelList).length).toBe(1),
  getRightCount: (length) => expect(wrapper.find(NotificationsPanelHeader)
                 .props().notificationsCount).toBe(length)
};

const teardown = () => wrapper.unmount();

describe('<NotificationsPanel />', () => {
  afterEach(teardown);

  it('should render NotificationsPanelHeader', () => {
    setup();
    should.renderPanelHeader();
  });

  it('should render NotificationsPanelList', () => {
    setup();
    should.renderPanelList();
  });

  describe('<NotificationsPanelHeader />', () => {
    it('should get right notifications count', () => {
      const notifications = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      setup({ notifications });
      should.getRightCount(notifications.length);
    });
  });
});
