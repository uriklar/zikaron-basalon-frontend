import { mount } from 'enzyme';
import { get, assign } from 'lodash';
import { noop } from 'test-utils';
import { ISRAEL } from 'constants/config';
import moment from 'moment-timezone';

import { Root } from 'components/root';

let wrapper;

/* eslint-disable camelcase */
window.clicky_custom = {};
window.ga = noop;

const setup = (options = {}, prototype = {}) => {
  const props = {
    currentUser: get(options, 'currentUser') || {},
    areas: get(options, 'areas'),
    plots: get(options, 'plots'),
    currentArea: get(options, 'selectedArea'),
    currentPlot: get(options, 'selectedPlot'),
    pushState: get(options, 'pushState') || noop,
    selectPlot: noop,
    deselectPlot: noop,
    selectArea: noop,
    deselectArea: noop,
    fetchAreasAndPlots: get(options, 'fetchAreasAndPlots') || noop,
    unstarPlot: noop,
    routes: []
  };

  assign(Root.prototype, {
    initAnalytics: noop
  }, prototype);

  wrapper = mount(<Root { ...props } />);
};

const should = {
  fetchAreasAndPlots: () => expect(wrapper.instance().props.fetchAreasAndPlots).toHaveBeenCalled(),
  navigateTo: (path) => expect(wrapper.instance().props.pushState).toHaveBeenCalledWith(path),
  initAnalytics: () => expect(wrapper.instance().initAnalytics).toHaveBeenCalled(),
  setLocaleTo: (locale) => expect(moment.locale()).toEqual(locale)
};


describe('<Root />', () => {

  it('should render', () => {
    setup();
    expect(wrapper).toBeDefined();
  });

  it('should init analytics', () => {
    setup(null, { initAnalytics: jasmine.createSpy() });

    should.initAnalytics();
  });

  it('should redirect to current-user if not logged in', () => {
    setup({ pushState: jasmine.createSpy() });

    should.navigateTo('/current-user');
  });

  it('should set the locale by users country', () => {
    setup({ currentUser: { country: ISRAEL, authToken: 'token' } });

    should.setLocaleTo('he');
  });

  it('should fetch areas and plots', () => {
    setup({
      currentUser: { authToken: 'token' },
      fetchAreasAndPlots: jasmine.createSpy()
    });

    should.fetchAreasAndPlots();
  });

});
