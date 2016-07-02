import { shallow } from 'enzyme';
import { assign as _assign } from 'lodash';
import Immutable from 'seamless-immutable';

import PlotSearch from 'components/common/plot-search/plot-search';
import PlotSearchDropdown from 'components/common/plot-search/plot-search-dropdown';

let wrapper;

const setup = (options = {}) => {
  const props = _assign({
    areas: Immutable([{ name: 'test', id: 1 }]),
    plots: Immutable([{ name: 'test', id: 1 }]),
    placeholder: 'test-placeholder',
    currentArea: null,
    setVisibleAreasAndPlots: jasmine.createSpy(),
    isFiltered: false
  }, options);

  wrapper = shallow(<PlotSearch { ...props } />);
};

const teardown = () => wrapper.unmount();
const state = () => wrapper.instance().state;
const props = () => wrapper.instance().props;

const dropdown = () => wrapper.find(PlotSearchDropdown);

const clickReset = () => dropdown().props().reset();

const should = {
  haveDefaultValue: () => expect(state().inputValue).toEqual('ALL AREAS'),
  setInputAsCurrentArea: () => expect(state().inputValue).toEqual(props().currentArea.name),
  callForResetVisible: () => expect(wrapper.instance().props.setVisibleAreasAndPlots)
                             .toHaveBeenCalled()
};

describe('<PlotSearch />', () => {
  afterEach(teardown);

  it('should set input as current area name', () => {
    setup();
    should.haveDefaultValue();

    wrapper.setProps({ currentArea: { name: 'test' } });
    should.setInputAsCurrentArea();
  });

  xit('should pass placeholder to input', () => {});

  it('should call for resetVisible', () => {
    setup();
    clickReset();
    should.callForResetVisible();
  });
});
