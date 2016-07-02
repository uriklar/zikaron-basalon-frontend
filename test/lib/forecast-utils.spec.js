import { assign } from 'lodash';
import { transformForecast } from 'lib/forecast-utils';
import { FORECAST_DATA } from '../mocks/mock-data';
import { WEATHER_ICONS } from 'constants/config';

/* eslint-disable no-magic-numbers, camelcase */

const FORECAST_DAYS = 5;

const getForecast = (type) => {
  let first_date;

  switch (type) {
    case 'fresh':
      first_date = Date.now();
      break;
    case 'stale':
      first_date = new Date('1/5/2016').getTime();
      break;
    default:
      first_date = null;
      break;
  }

  return transformForecast(assign(FORECAST_DATA, { first_date }));
};

describe('transformForecast', () => {
  it('should return a five day forecast', () => {
    const forecast = getForecast('fresh');

    expect(forecast.length).toEqual(FORECAST_DAYS);
  });

  it('should return empty forecast if not available', () => {
    const forecast = getForecast();

    expect(forecast[0].et).toBe(null);
  });

  it('should return correct icon', () => {
    const forecast = getForecast('fresh');

    expect(forecast[3].icon).toEqual(WEATHER_ICONS[2]);
  });

  it('should return correct icon with offset if last_day is not today', () => {
    const forecast = getForecast('stale');

    expect(forecast[3].icon).toEqual(WEATHER_ICONS[9]);
  });

  it('should calculate et', () => {
    const forecast = getForecast('fresh');

    expect(forecast[0].et).toEqual(FORECAST_DATA.penman[0].toFixed(2));
  });
});
/* eslint-enable no-magic-numbers, camelcase */

