import { TimeFrameSelect } from 'components/plot-bar/time-frame-select';
import TimeFrameSelectHeader from 'components/plot-bar/time-frame-select/time-frame-select-header';
import { TIME_FRAMES } from 'constants/config';
import { createFilter } from 'lib/time-filter-utils';
import { noop } from 'test-utils';
import { shallow } from 'enzyme';
import Immutable from 'seamless-immutable';

let wrapper;

const setup = ({
  timeFrame = '2w',
  earliestDate = '2015-08-24',
  latestDate = null,
  startDate = '2016-03-14',
  endDate = '2016-03-27',
  timeFramesList = null
}) => {
  timeFramesList = timeFramesList || Immutable(createFilter(
    earliestDate,
    timeFrame,
    latestDate
  ));

  const props = {
    timeFrame,
    timeFramesList,
    startDate,
    endDate,
    setDisplayDates: noop,
    setTimeFrame: noop
  };

  wrapper = shallow(<TimeFrameSelect { ...props } />);
};

const headerProps = () => wrapper.find(TimeFrameSelectHeader).props();

describe('<TimeFrameSelect />', () => {
  it('should render', () => {
    setup({});

    expect(wrapper).toBeDefined();
  });

  Object.keys(TIME_FRAMES).forEach((key) => {
    if (key === 'SEASON') {
      // No support for Season
      return;
    }

    describe(key, () => {
      const timeFrame = TIME_FRAMES[key];

      describe('Header', () => {

        it('should pass correct timeframe', () => {
          setup({ timeFrame });

          expect(headerProps().timeFrame).toBe(timeFrame);
        });

        describe('offset', () => {
          it('should start at 0', () => {
            setup({ timeFrame });

            expect(headerProps().offset).toBe(0);
          });

          it('should increase', () => {
            setup({ timeFrame });

            headerProps().next();
            wrapper.update();

            expect(headerProps().offset).toBe(1);
          });

          it('should decrease', () => {
            setup({ timeFrame });

            headerProps().next();
            headerProps().previous();
            wrapper.update();

            expect(headerProps().offset).toBe(0);
          });

          it('should not go above size', () => {
            setup({
              timeFrame,
              timeFramesList: [1, 2]
            });

            headerProps().next();
            headerProps().next();
            wrapper.update();

            expect(headerProps().offset).toBe(1);
          });

          it('should not go below size', () => {
            setup({ timeFrame });

            headerProps().next();
            headerProps().previous();
            headerProps().previous();
            wrapper.update();

            expect(headerProps().offset).toBe(0);
          });
        });
      });
    });
  });
});
