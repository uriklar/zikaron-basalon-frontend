import ToggleVisible from 'components/common/toggle-visible';
import { mount } from 'enzyme';

let wrapper;

const setup = (options = {}) => {
  const props = Object.assign({
    visible: true,
    onFocusLost: jasmine.createSpy(),
    className: null,
    children: <div className="child-component"/>
  }, options);

  wrapper = mount(<ToggleVisible { ...props } />);
};

const should = {
  callFocusLost: () => expect(wrapper.props().onFocusLost).toHaveBeenCalled(),
  notCallFocusLost: () => expect(wrapper.props().onFocusLost).not.toHaveBeenCalled(),
  renderChildren: () => expect(wrapper.find('.child-component').length).toBe(1),
  notRenderChildren: () => expect(wrapper.find('.child-component').length).toBe(0)
};

const teardown        = () => wrapper.unmount();
const clickOnDocument = () => document.dispatchEvent(new MouseEvent('click'));

describe('<ToggleVisible />', () => {
  afterEach(teardown);

  it('should render children if visible', () => {
    setup();
    should.renderChildren();
  });

  it('should not render children if not visible', () => {
    setup({ visible: false });
    should.notRenderChildren();
  });

  it('should set correct class name', () => {
    setup({ className: 'test-class' });
    expect(wrapper.find('.test-class').length).toBe(1);
  });

  it('should call onFocusLost when clicking anywhere in the document', () => {
    setup();
    should.notCallFocusLost();
    clickOnDocument();
    should.callFocusLost();
  });

  it('should not call onFocusLost when not visible', () => {
    setup({ visible: false });
    clickOnDocument();
    should.notCallFocusLost();
  });

  it('should not call onFocusLost when clicking on children', () => {
    setup();
    wrapper.find('.child-component').simulate('click');
    should.notCallFocusLost();
  });

  it('should remove listener when invisible', () => {
    setup();
    wrapper.setProps({ visible: false });
    clickOnDocument();
    should.notCallFocusLost();
  });

  it('should re-add listener when becomes visible again', () => {
    setup();
    wrapper.setProps({ visible: false });
    wrapper.setProps({ visible: true });
    clickOnDocument();
    should.callFocusLost();
  });
});
