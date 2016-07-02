import { shallow } from 'enzyme';
import Immutable from 'seamless-immutable';
import { assign as _assign } from 'lodash';

import NotificationsPanelList from 'components/top-bar/notifications-panel/notifications-panel-list';
import Notification from 'components/top-bar/notification';
import NoNotifications from 'components/top-bar/no-notifications';

let wrapper;

const setup = (options = {}) => {
  const props = _assign({
    unstar: jasmine.createSpy(),
    notifications: Immutable([{}, {}])
  }, options);

  wrapper = shallow(<NotificationsPanelList { ...props } />);
};

const notificationsComponent   = () => wrapper.find(Notification);
const noNotificationsComponent = () => wrapper.find(NoNotifications);

const should = {
  renderNotificationComponent: (length) => expect(notificationsComponent().length).toBe(length),
  notRenderNotificationComponents: () => expect(notificationsComponent().length).toBe(0),
  renderNoNotificationsComponent: () => expect(noNotificationsComponent().length).toBe(1),
  notRenderNoNotificationsComponent: () => expect(noNotificationsComponent().length).toBe(0),
  getRightPlotName: (name) => expect(notificationsComponent().props().name).toEqual(name),
  getRightStress: (name) => expect(notificationsComponent().props().stress).toEqual(name)
};

const teardown = () => wrapper.unmount();

describe('<NotificationsPanelList />', () => {
  afterEach(teardown);

  it('should render the same number of Notification components as there are notifications', () => {
    const notifications = Immutable([{}, {}, {}, {}, {}]);

    setup({ notifications });
    should.renderNotificationComponent(notifications.length);
  });

  it('should not render Notification and render NoNotifications if no notifications', () => {
    setup({ notifications: Immutable([]) });
    should.renderNoNotificationsComponent();
    should.notRenderNotificationComponents();
  });

  it('should not render NoNotifications and render Notification if there are notifications', () => {
    setup();
    should.renderNotificationComponent(2);
    should.notRenderNoNotificationsComponent();
  });

  it('should test', () => {
    setup({ notifications: Immutable([{ stress: 'mild', name: 'test' }]) });
    should.getRightPlotName('test');
    should.getRightStress('mild');
  });
});
