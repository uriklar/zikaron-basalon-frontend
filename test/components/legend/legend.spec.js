import Immutable from 'seamless-immutable';
import { LEGEND_VALUES } from 'constants/config';
import { getLegendThresholds, widthRatio } from 'lib/legend-utils';
import { shallow } from 'enzyme';

import { Legend } from 'components/common/legend/legend';
import LegendTriangle from 'components/common/legend/legend-triangle';
import LegendBar from 'components/common/legend/legend-bar';
import RecommendedText from 'components/common/legend/recommended-text';

let wrapper;

const setup = (options = {}) => {
  const props = Object.assign({
    settings: Immutable(getLegendThresholds(LEGEND_VALUES)),
    currentPlot: { data: {} },
    stressLevel: null,
    toggleLegendPopup: jasmine.createSpy()
  }, options);

  wrapper = shallow(<Legend { ...props } />);
};

const teardown = () => wrapper.unmount();
const childProp = (child, prop) => wrapper.find(child).props()[prop];

const should = {
  haveXBars: (x) => expect(wrapper.find(LegendBar).length).toEqual(x),
  haveNullLegendTriangleCenter: () => expect(childProp(LegendTriangle, 'center')).toBe(null),
  haveCenterAtX: (component, x) => expect(childProp(component, 'center') / widthRatio).toEqual(x)
};

describe('<Legend />', () => {
  afterEach(teardown);

  it('should render', () => {
    setup();

    expect(wrapper).toBeDefined();
  });

  describe('<LegendTriangle />', () => {
    it('should render', () => {
      setup();

      expect(wrapper.find(LegendTriangle)).toBeDefined();
    });

    it('should return null center for no hovered stress value', () => {
      setup();

      should.haveNullLegendTriangleCenter();
    });

    it('should return null center if stress value is false (not-available)', () => {
      setup({ stressValue: false });

      should.haveNullLegendTriangleCenter();
    });

    it('should return correct center if plot exists', () => {
      const INDICATOR_VALUE = 3;
      const STRESS_VALUE = 70;

      /* eslint-disable camelcase */
      setup({
        currentPlot: { data: { indicator_value: INDICATOR_VALUE } }
      });
      /* eslint-enable camelcase */
      should.haveCenterAtX(LegendTriangle, STRESS_VALUE);
    });

    it('should return correct center if hovered value exists', () => {
      const HOVERED_VALUE = 70;

      setup({ stressValue: HOVERED_VALUE });

      should.haveCenterAtX(LegendTriangle, HOVERED_VALUE);
    });
  });

  describe('<LegendBar />', () => {
    it('should render all bars', () => {
      const NUM_OF_BARS = 5;

      setup();
      should.haveXBars(NUM_OF_BARS);
    });
  });

  describe('<RecommendedText />', () => {
    it('should have correct center', () => {
      const RECOMMENDED_CENTER = 70;

      setup();

      should.haveCenterAtX(RecommendedText, RECOMMENDED_CENTER);
    });
  });
});
