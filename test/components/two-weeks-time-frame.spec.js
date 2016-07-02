import TwoWeeksTimeFrame from 'components/plot-bar/time-frame-select/two-weeks-time-frame';
import { noop } from 'test-utils';
import { mount } from 'enzyme';
import { localizeMoment } from 'lib/utils';

const END_DATE = '2016-01-17T00:00:00.100+0000';
const START_DATE = '2015-09-09T00:00:00.100+0000';
const ISRAEL_END_DATE = '2016-01-16T00:00:00.100+0000';

const setup = (changeTimeFrame = noop, isLast = false, timeFrame = {}, country = 'NOT_ISRAEL') => {
  const props = {
    timeFrame,
    offset: 10,
    changeTimeFrame,
    isLast
  };

  localizeMoment(country);

  return {
    props,
    wrapper: mount(<TwoWeeksTimeFrame { ...props } />)
  };
};

describe('<TwoWeeksTimeFrame />', () => {
  const timeFrame = {
    startDate: START_DATE,
    endDate: END_DATE
  };

  it('should make correct call on Click', () => {
    const spy = jasmine.createSpy();
    const { wrapper, props } = setup(spy, false, timeFrame);

    wrapper.find('.dropdown-double-component').simulate('click');

    expect(spy).toHaveBeenCalledWith(props.offset);
  });

  it('show correct title', () => {
    const { wrapper } = setup(noop, false, timeFrame);

    expect(wrapper.find('.dropdown-title').text()).toEqual('Week 2');
  });

  it('show correct date', () => {
    const { wrapper } = setup(noop, false, timeFrame);

    expect(wrapper.find('.dropdown-date').text()).toEqual('Jan 11 -  17');
  });

  it('show correct year', () => {
    const newTimeFrame = {
      endDate: '2013-01-06',
      startDate: '2012-12-24'
    };

    const { wrapper } = setup(noop, false, newTimeFrame);

    expect(wrapper.find('.dropdown-title').text()).toEqual('Week 1 2013');
  });

  describe('Israeli user', () => {
    it('show correct title', () => {
      const newTimeFrame = {
        endDate: '2016-03-19',
        startDate: '2016-03-06'
      };
      const { wrapper } = setup(noop, false, newTimeFrame, 'Israel');

      expect(wrapper.find('.dropdown-title').text()).toEqual('Week 11');
    });

    it('show correct date', () => {
      const newTimeFrame = {
        endDate: ISRAEL_END_DATE,
        startDate: START_DATE
      };
      const { wrapper } = setup(noop, false, newTimeFrame, 'Israel');

      expect(wrapper.find('.dropdown-date').text()).toEqual('Jan 10 -  16');
    });

    it('show correct year', () => {
      const newTimeFrame = {
        endDate: '2013-01-05',
        startDate: '2012-12-23'
      };

      const { wrapper } = setup(noop, false, newTimeFrame, 'Israel');

      expect(wrapper.find('.dropdown-title').text()).toEqual('Week 1 2013');
    });
  });
});
