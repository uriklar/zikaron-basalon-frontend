import { shallow } from 'enzyme';
import { assign as _assign } from 'lodash';
import Immutable from 'seamless-immutable';

import PlotSearchDropdown from 'components/common/plot-search/plot-search-dropdown';

let wrapper;
const list = [
  { name: 't', id: 1 },
  { name: 'te', id: 2 },
  { name: 'tes', id: 3 }
];

const setup = (options = {}) => {
  const props = _assign({
    visible: true,
    areas: Immutable([{ name: 'test', id: 1 }]),
    plots: Immutable([{ name: 'test', id: 1 }]),
    input: '',
    selectItem: jasmine.createSpy(),
    reset: jasmine.createSpy()
  }, options);

  wrapper = shallow(<PlotSearchDropdown { ...props } />);
};

const plotsListHeader = () => wrapper.contains(<li className="category">PLOTS</li>);
const areasListHeader = () => wrapper.contains(<li className="category">AREAS</li>);
const filteredItem    = () => wrapper.find('.filtered-item');
const allPlots        = () => wrapper.find('.all-plots');

const teardown = () => wrapper.unmount();
const clickOnItem = () => filteredItem().simulate('mouseDown');
const clickOnAllPots = () => allPlots().simulate('mouseDown');

const should = {
  notRender: () => expect(wrapper.node).toEqual(null),
  render: () => expect(wrapper.node).not.toEqual(null),
  renderAreasList: () => expect(areasListHeader()).toBeTrue,
  notRenderAreasList: () => expect(areasListHeader()).toBeFalse,
  renderPlotsList: () => expect(plotsListHeader()).toBeTrue,
  notRenderPlotsList: () => expect(plotsListHeader()).toBeFalse,
  renderRightAmountOfItems: (length) => expect(filteredItem().length).toBe(length),
  callSelectItem: () => expect(wrapper.instance().props.selectItem).toHaveBeenCalled(),
  callReset: () => expect(wrapper.instance().props.reset).toHaveBeenCalled()
};

describe('<PlotSearchDropdown />', () => {
  afterEach(teardown);

  it('should not render if not visible or no plots and areas', () => {
    const options = [{ visible: false }, { areas: Immutable([]), plots: Immutable([]) }];

    options.forEach((option) => {
      setup(option);
      should.notRender();
    });
  });

  it('should render if no plots or no areas', () => {
    const options = [{ areas: Immutable([]) }, { plots: Immutable([]) }];

    options.forEach((option) => {
      setup(option);
      should.render();
    });
  });

  it('should render only areas lists if input is empty', () => {
    setup();
    should.renderAreasList();
  });

  it('should render areas and plot lists if input not empty and matches their names', () => {
    setup({ input: 'test' });
    should.renderAreasList();
    should.renderPlotsList();
  });

  it('should not render areas and plot lists if input not empty && not matches their names', () => {
    setup({ input: 'test2' });
    should.notRenderAreasList();
    should.notRenderPlotsList();
  });

  it('should not render areas list if no areas', () => {
    setup({ areas: Immutable([]) });
    should.notRenderAreasList();
  });

  it('should not render plots list if no plots', () => {
    setup({ plots: Immutable([]) });
    should.notRenderPlotsList();
  });

  it('should render right number of areas in areas list', () => {
    const plots = Immutable([]);
    const areas = Immutable(list);

    setup({ areas, plots, input: 't' });
    should.renderRightAmountOfItems(areas.length);
  });

  it('should render right number of plots in plots list', () => {
    const areas = Immutable([]);
    const plots = Immutable(list);

    setup({ areas, plots, input: 't' });
    should.renderRightAmountOfItems(plots.length);
  });

  it('should render right number of both plots and areas in list', () => {
    const areas = Immutable(list);
    const plots = Immutable(list);

    setup({ areas, plots, input: 't' });
    should.renderRightAmountOfItems(plots.length + areas.length);
  });

  it('should call for selectItem on list item click', () => {
    setup();
    clickOnItem();
    should.callSelectItem();
  });

  it('should call for reset on All Plots click', () => {
    setup();
    clickOnAllPots();
    should.callReset();
  });

  it('should change the plots list accordingly to input changes', () => {
    const areas = Immutable([]);
    const plots = Immutable(list);

    setup({ areas, plots });

    // Plots do not show if input is empty
    should.renderRightAmountOfItems(0);

    wrapper.setProps({ input: 't' });
    should.renderRightAmountOfItems(3);

    wrapper.setProps({ input: 'te' });
    should.renderRightAmountOfItems(2);

    wrapper.setProps({ input: 'tes' });
    should.renderRightAmountOfItems(1);

    wrapper.setProps({ input: 'test' });
    should.renderRightAmountOfItems(0);
  });

  it('should change the areas list accordingly to input changes', () => {
    const plots = Immutable([]);
    const areas = Immutable(list);

    setup({ areas, plots });
    should.renderRightAmountOfItems(3);

    wrapper.setProps({ input: 't' });
    should.renderRightAmountOfItems(3);

    wrapper.setProps({ input: 'te' });
    should.renderRightAmountOfItems(2);

    wrapper.setProps({ input: 'tes' });
    should.renderRightAmountOfItems(1);

    wrapper.setProps({ input: 'test' });
    should.renderRightAmountOfItems(0);
  });

  it('should change the areas and plots lists accordingly to input changes', () => {
    const plots = Immutable(list);
    const areas = Immutable(list);

    setup({ areas, plots });
    should.renderRightAmountOfItems(3);

    wrapper.setProps({ input: 't' });
    should.renderRightAmountOfItems(6);

    wrapper.setProps({ input: 'te' });
    should.renderRightAmountOfItems(4);

    wrapper.setProps({ input: 'tes' });
    should.renderRightAmountOfItems(2);

    wrapper.setProps({ input: 'test' });
    should.renderRightAmountOfItems(0);
  });
});
