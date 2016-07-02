import { shallow } from 'enzyme';
import { assign as _assign } from 'lodash';

import PlotSearchInput from 'components/common/plot-search/plot-search-input';

let wrapper;

const setup = (options = {}) => {
  const props = _assign({
    onFocus: jasmine.createSpy(),
    onBlur: jasmine.createSpy(),
    placeholder: 'test-placeholder',
    onChange: jasmine.createSpy()
  }, options);

  wrapper = shallow(<PlotSearchInput { ...props } />);
};

const should = {
  callOnBlur: () => expect(wrapper.instance().props.onBlur).toHaveBeenCalled(),
  callOnFocus: () => expect(wrapper.instance().props.onFocus).toHaveBeenCalled(),
  callOnChange: () => expect(wrapper.instance().props.onChange)
                      .toHaveBeenCalledWith('new value')
};

const simulateBlur   = () => wrapper.find('input').simulate('blur');
const simulateFocus  = () => wrapper.find('input').simulate('focus');
const simulateChange = () => wrapper.find('input')
                             .simulate('change', { target: { value: 'new value' } });

describe('<PlotSearchInput />', () => {
  it('should call onChange on change event', () => {
    setup();
    simulateChange();
    should.callOnChange();
  });

  it('should call onFocus on focus event', () => {
    setup();
    simulateFocus();
    should.callOnFocus();
  });

  it('should call onBlur on blur event', () => {
    setup();
    simulateBlur();
    should.callOnBlur();
  });

  xit('should have a correct placeholder', () => {});
});
