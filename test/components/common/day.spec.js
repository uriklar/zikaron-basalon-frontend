import Day from 'components/common/day';
import { noop } from 'test-utils';
import { shallow } from 'enzyme';
import { get, omit } from 'lodash';

import IrrigationAmount from 'components/common/day/irrigation-amount';
import NoIrrigationData from 'components/common/day/no-irrigation-data';
import PrecipitationAmount from 'components/common/day/precipitation-amount';

const setup = (options = {}) => {
  const props = {
    stressLevel: get(options, 'stressLevel', 'no-plus'),
    irrigationAmount: get(options, 'irrigationAmount', 1),
    maxIrrigationAmount: get(options, 'maxIrrigationAmount', 10),
    rain: get(options, 'rain', 0),
    isActive: get(options, 'isActive', false),
    alternateColor: get(options, 'alternateColor', false),
    height: get(options, 'height', 50),
    title: get(options, 'title', 'test'),
    stressValue: get(options, 'stressValue', 90),
    unit: get(options, 'unit', 'mm'),
    onHover: get(options, 'onHover', noop),
    isList: get(options, 'isList', false),
    day: get(options, 'day', 1456704000000),
    isFuture: get(options, 'isFuture', false),
    isLast: get(options, 'isLast', false)
  };

  return {
    props,
    wrapper: shallow(<Day { ...props } />)
  };
};

describe('<Day />', () => {
  describe('<PrecipitationAmount />', () => {
    const getProps = (wrapper) => wrapper.find(PrecipitationAmount).props();

    it('should render PrecipitationAmount', () => {
      const { wrapper } = setup();

      expect(wrapper.find(PrecipitationAmount)).toBeDefined();
    });

    it('should pass correct amount', () => {
      const { props, wrapper } = setup();

      expect(getProps(wrapper)).toEqual({
        amount: props.rain,
        displayValueIcon: !props.isList,
        unit: props.unit
      });
    });
  });

  describe('<IrrigationAmount />', () => {
    const getProps = (wrapper) => wrapper.find(IrrigationAmount).props();

    it('should render IrrigationAmount', () => {
      const { wrapper } = setup();

      expect(wrapper.find(IrrigationAmount)).toBeDefined();
    });

    it('should pass correct amount', () => {
      const { props, wrapper } = setup();

      expect(omit(getProps(wrapper), 'showIrrigationPopup')).toEqual({
        amount: props.irrigationAmount,
        maxAmount: props.maxIrrigationAmount,
        minHeightForText: 24,
        displayValueIcon: !props.isList,
        rainAmount: 0,
        unit: props.unit
      });
    });
  });

  describe('<NoIrrigationData />', () => {
    it('should render NoIrrigationData when there is none', () => {
      const { wrapper } = setup({
        isFuture: false,
        isActive: false,
        rain: 0,
        irrigationAmount: null
      });

      expect(wrapper.find(NoIrrigationData).length).toBe(1);
    });

    [
      { isFuture: true, isActive: false, rain: 0, irrigationAmount: null },
      { isFuture: false, isActive: true, rain: 0, irrigationAmount: null },
      { isFuture: false, isActive: false, rain: 1, irrigationAmount: null },
      { isFuture: false, isActive: false, rain: 0, irrigationAmount: 100 }
    ].forEach((row) => {
      it('should not render NoIrrigationData', () => {
        const { wrapper } = setup(row);

        expect(wrapper.find(NoIrrigationData).length).toBe(0);
      });
    });
  });

  describe('stress level', () => {
    it('should show correct stress level', () => {
      const { wrapper } = setup({ stressLevel: 'test' });

      expect(wrapper.find(`.stress.test`).length).toBe(1);
    });
  });
});
