import Immutable from 'seamless-immutable';
import { LEGEND_VALUES } from 'constants/config';
import { getLegendThresholds } from 'lib/legend-utils';
import { shallow } from 'enzyme';


import LegendPopup from 'components/common/legend/legend-popup';

let wrapper;

const setup = (options = {}) => {
  const props = Object.assign({
    settings: Immutable(getLegendThresholds(LEGEND_VALUES)),
    currentPlot: { data: {} },
    isSeason: false,
    closePopup: jasmine.createSpy()
  }, options);

  wrapper = shallow(<LegendPopup { ...props } />);
};


describe('<LegendPopup />', () => {
  it('should render', () => {
    setup();

    expect(wrapper).toBeDefined();
  });
});
