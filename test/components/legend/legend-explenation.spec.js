import { LEGEND_VALUES, CS_LEGEND_VALUES } from 'constants/config';
import { getLegendThresholds } from 'lib/legend-utils';
import { shallow } from 'enzyme';

import LegendExplanation from 'components/common/legend/legend-explanation';
import LegendBar from 'components/common/legend/legend-bar';

let wrapper;

const setup = (options = {}) => {
  const props = Object.assign({
    settings: getLegendThresholds(LEGEND_VALUES),
    currentPlot: { data: {} },
    highlightedIndex: 0,
    highlightBar: jasmine.createSpy(),
    initHighlightingInterval: jasmine.createSpy(),
    isSeason: false
  }, options);

  wrapper = shallow(<LegendExplanation { ...props } />);
};

const teardown = () => wrapper.unmount();

const should = {
  highlightBar: (bar) => expect(bar.props.isHighlighted).toBe(true),
  notHighlightBar: (bar) => expect(bar.props.isHighlighted).toBe(false),
  haveXBars: (x) => expect(wrapper.find(LegendBar).length).toEqual(x)
};

describe('<LegendExplanation />', () => {
  afterEach(teardown);

  it('should render', () => {
    setup();

    expect(wrapper).toBeDefined();
  });

  it('should render 5 bars in regular view', () => {
    const NUM_OF_BARS = 5;

    setup();
    should.haveXBars(NUM_OF_BARS);
  });

  it('should render 3 bars in season view', () => {
    const NUM_OF_BARS = 3;

    setup({
      isSeason: true,
      settings: getLegendThresholds(CS_LEGEND_VALUES)
    });

    should.haveXBars(NUM_OF_BARS);
  });

  it('should highlight correct bar', () => {
    setup();
    let bars = wrapper.find(LegendBar).nodes;

    should.highlightBar(bars[0]);
    should.notHighlightBar(bars[1]);


    setup({ highlightedIndex: 1 });
    bars = wrapper.find(LegendBar).nodes;

    should.highlightBar(bars[1]);
    should.notHighlightBar(bars[0]);
  });
});

