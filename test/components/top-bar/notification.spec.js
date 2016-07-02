import { shallow } from 'enzyme';
import { assign as _assign } from 'lodash';

import Notification from 'components/top-bar/notification';

let wrapper;
const CLICK_EVENT = 'click';

const setup = (options = {}) => {
  const props = _assign({
    stress: '',
    name: '',
    plotId: 1,
    areaId: 2,
    unstar: jasmine.createSpy()
  }, options);

  wrapper = shallow(<Notification { ...props } />);
};

const should = {
  callUnstar: () => expect(wrapper.instance().props.unstar).toHaveBeenCalled(),
  haveRightClassName: (className) => expect(wrapper.find(className)).toBeDefined(),
  renderPlotName: (name) => expect(wrapper.find('.notification-title').props().children).toBe(name),
  callUnstarWithPlotId: (plotId) => expect(wrapper.instance().props.unstar)
                        .toHaveBeenCalledWith(CLICK_EVENT, plotId)
};

const teardown     = () => wrapper.unmount();
const clickOnClose = () => wrapper.find('.close-icon').simulate('click', CLICK_EVENT);

describe('<Notification />', () => {
  afterEach(teardown);

  it('should call for unstar on close icon click', () => {
    setup();
    clickOnClose();
    should.callUnstar();
  });

  it('should call unstar with plot id', () => {
    [1, 2, 3, 4, 5].forEach((plotId) => {
      setup({ plotId });
      clickOnClose();
      should.callUnstarWithPlotId(plotId);
    });
  });

  it('should have class name as stress value', () => {
    const stress = 'mid-low';

    setup({ stress });
    should.haveRightClassName(stress);
  });

  it('should render plots name', () => {
    const name = 'test';

    setup({ name });
    should.renderPlotName(name);
  });
});
