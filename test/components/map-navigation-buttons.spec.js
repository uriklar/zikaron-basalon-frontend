import { MapNavigationButtons, getAreasForButtons } from 'components/map-navigation-buttons';
import { shallow } from 'enzyme';
import { noop } from 'test-utils';

let wrapper;
const defaultProps = {
  areas: [1, 2, 3, 4],
  visible: true,
  currentArea: { id: 1 },
  pushState: noop,
  northern: [],
  eastern: [],
  southern: [],
  western: [],
};

const setup = (options = {}) => {
  const props = Object.assign({}, defaultProps, options);

  wrapper = shallow(<MapNavigationButtons { ...props } />);
};

const should = {
  notRender: () => expect(wrapper.html()).toBe(null),
  renderButtonWith: ({ side, areas }) => expect(wrapper.find({ side }).props())
    .toEqual(jasmine.objectContaining({ side, areas })),
};

const teardown = () => wrapper.unmount();

describe('<MapNavigationButtons />', () => {
  afterEach(teardown);

  it('should not render without areas', () => {
    setup({ areas: null });
    should.notRender();
  });

  it('should not render without current area', () => {
    setup({ currentArea: null });
    should.notRender();
  });

  it('should not render if only have one area', () => {
    setup({ areas: [1] });
    should.notRender();
  });

  it('should render correct buttons', () => {
    setup({ northern: [1], southern: [2], eastern: [3], western: [4] });

    [
      { side: 'north', areas: [1] },
      { side: 'south', areas: [2] },
      { side: 'east', areas: [3] },
      { side: 'west', areas: [4] }
    ].forEach((props) => should.renderButtonWith(props));
  });
});

describe('getAreasForButtons', () => {
  const areas = [
    {
      coordinates: [
        { lat: 1, lng: 2 },
        { lat: 3, lng: 4 }
      ]
    },
    {
      coordinates: [
        { lat: 6, lng: 7 },
        { lat: 4, lng: 8 }
      ]
    },
    {
      coordinates: [
        { lat: 2, lng: 2 },
        { lat: 1, lng: 6 }
      ]
    },
    {
      coordinates: [
        { lat: 1, lng: 1 },
        { lat: 2, lng: 4 }
      ]
    }
  ];

  it('case A', () => {
    const result = getAreasForButtons({ areas, currentArea: areas[0] });
    const expectedResult = {
      areas,
      currentArea: areas[0],
      northern: [areas[1]],
      southern: [],
      eastern: [areas[1], areas[2]],
      western: [areas[3]]
    };

    expect(result).toEqual(expectedResult);
  });

  it('case B', () => {
    const result = getAreasForButtons({ areas, currentArea: areas[1] });
    const expectedResult = {
      areas,
      currentArea: areas[1],
      northern: [],
      southern: [areas[0], areas[2], areas[3]],
      eastern: [],
      western: [areas[0], areas[2], areas[3]]
    };

    expect(result).toEqual(expectedResult);
  });

  it('case C', () => {
    const result = getAreasForButtons({ areas, currentArea: areas[2] });
    const expectedResult = {
      areas,
      currentArea: areas[2],
      northern: [areas[0], areas[1]],
      southern: [],
      eastern: [areas[1]],
      western: [areas[3]]
    };

    expect(result).toEqual(expectedResult);
  });

  it('case D', () => {
    const result = getAreasForButtons({ areas, currentArea: areas[3] });
    const expectedResult = {
      areas,
      currentArea: areas[3],
      northern: [areas[0], areas[1]],
      southern: [],
      eastern: [areas[1], areas[2]],
      western: []
    };

    expect(result).toEqual(expectedResult);
  });
});
