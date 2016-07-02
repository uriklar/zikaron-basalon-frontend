import Immutable from 'seamless-immutable';
import { find } from 'lodash';
import areasReducer from 'reducers/areas';
import { AREA_DATA, PLOT_DATA, FORECAST_DATA } from '../mocks/mock-data';

/* eslint-disable no-magic-numbers */
const initialState = Immutable(null);

describe('Areas Reducer', () => {
  let areas;

  beforeAll(() => {
    areas = areasReducer(initialState, {
      type: 'FETCH_AREAS_AND_PLOTS_SUCCESS',
      payload: {
        areas: AREA_DATA,
        plots: PLOT_DATA
      }
    });
  });

  describe('FETCH_AREAS_AND_PLOTS.SUCCESS', () => {
    it('creates all areas', () => {
      expect(areas.length).toEqual(AREA_DATA.length);
    });

    it('assigns area coordinates', () => {
      expect(areas[0].coordinates[0].lat).toEqual(AREA_DATA[0].ne_latitude);
      expect(areas[2].coordinates[3].lng).toEqual(AREA_DATA[2].sw_longitude);
    });

    it('calculates actively irrigated plots', () => {
      expect(areas[0].plotsWithActiveIrrigation).toEqual(1);
    });
  });

  describe('FETCH_AREA_FORECAST.SUCCESS', () => {
    const processForecastData = (data) => ({
      areaId: parseFloat(data.area_id),
      chillHours: data.chill_hours,
      stationName: data.station_name,
      provider: data.provider
    });

    it('assigns area forecast', () => {
      areas = areasReducer(areas, {
        type: 'FETCH_AREA_FORECAST_SUCCESS',
        payload: processForecastData(FORECAST_DATA)
      });

      const area = find(areas, { id: FORECAST_DATA.area_id });

      expect(area.provider).toEqual(FORECAST_DATA.provider);
      expect(area.chillHours).toEqual(FORECAST_DATA.chill_hours);
    });
  });
});
/* eslint-enable no-magic-numbers */
