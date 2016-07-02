import { noop } from 'test-utils';
import { shallow } from 'enzyme';
import { assign as _assign } from 'lodash';

import { Notifications } from 'components/top-bar/notifications';
import NotificationsPanel from 'components/top-bar/notifications-panel';
import NotificationsCount from 'components/top-bar/notifications-count';

let wrapper;

const setup = (options = {}) => {
  const props = _assign({
    notifications: [1, 2, 3, 4],
    unstarPlot: noop,
    panelVisible: true,
    hidePanel: noop
  }, options);

  wrapper = shallow(<Notifications { ...props } />);
};

const should = {
  renderNotificationsCount: () => expect(wrapper.find(NotificationsCount)).toBeDefined(),
  renderNotificationsPanel: () => expect(wrapper.find(NotificationsPanel).length).toBe(1),
  passCorrectCount: (length) => expect(wrapper.find(NotificationsCount).props().count)
                                .toEqual(length),
  notRenderNotificationsPanel: () => expect(wrapper.find(NotificationsPanel).length).toBe(0)
};

describe('<Notifications />', () => {
  describe('<NotificationsCount />', () => {
    it('should render NotificationsCount', () => {
      setup();
      should.renderNotificationsCount();
    });

    it('should pass correct count', () => {
      const notifications = [1, 2, 3, 4, 5, 6];

      setup({ notifications });
      should.passCorrectCount(notifications.length);
    });
  });

  describe('<NotificationsPanel />', () => {
    it('should render NotificationsPanel', () => {
      setup();
      should.renderNotificationsPanel();
    });

    it('should not render NotificationsPanel if panelVisible is false', () => {
      setup({ panelVisible: false });
      should.notRenderNotificationsPanel();
    });
  });
});
