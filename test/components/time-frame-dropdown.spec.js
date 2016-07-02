import { noop } from 'test-utils';
import { pick } from 'lodash';
import { shallow } from 'enzyme';
import Immutable from 'seamless-immutable';
import TimeFrameDropdown from 'components/plot-bar/time-frame-select/time-frame-dropdown';
import OneWeekTimeFrame from 'components/plot-bar/time-frame-select/one-week-time-frame';
import TwoWeeksTimeFrame from 'components/plot-bar/time-frame-select/two-weeks-time-frame';
import MonthTimeFrame from 'components/plot-bar/time-frame-select/month-time-frame';

const setup = (timeFrame, timeFramesList = [], changeTimeFrame = noop) => {
  const props = {
    timeFramesList: Immutable(timeFramesList),
    timeFrame,
    changeTimeFrame,
    toggle: noop,
    visible: true
  };

  return {
    props,
    wrapper: shallow(<TimeFrameDropdown { ...props } />)
  };
};

describe('<TimeFrameDropdown />', () => {
  const mapChildrenToProps = (wrapper, component) => wrapper.find(component)
    .map((child) => pick(child.props(), ['timeFrame', 'offset']));

  it('should render', () => {
    const { wrapper } = setup('7d');

    expect(wrapper).toBeDefined();
  });

  describe('7d', () => {
    it('should render correct children', () => {
      const { wrapper } = setup('7d', [1, 2]);
      const childProps = mapChildrenToProps(wrapper, OneWeekTimeFrame);

      expect(childProps).toEqual([{ timeFrame: 1, offset: 0 }, { timeFrame: 2, offset: 1 }]);
    });
  });

  describe('2w', () => {
    it('should render correct children', () => {
      const { wrapper } = setup('2w', [1, 2]);
      const childProps = mapChildrenToProps(wrapper, TwoWeeksTimeFrame);

      // TwoWeeksTimeFrame always consist of x+1 num of components
      expect(childProps).toEqual([
        { timeFrame: 1, offset: 0 },
        { timeFrame: 2, offset: 1 },
        { timeFrame: 2, offset: 1 }
      ]);
    });
  });


  describe('1m', () => {
    it('should render correct children', () => {
      const { wrapper } = setup('1m', [1, 2]);
      const childProps = mapChildrenToProps(wrapper, MonthTimeFrame);

      expect(childProps).toEqual([{ timeFrame: 1, offset: 0 }, { timeFrame: 2, offset: 1 }]);
    });
  });
});
