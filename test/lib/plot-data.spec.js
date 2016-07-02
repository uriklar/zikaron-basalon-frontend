import { getStressLevel } from 'lib/plot-data';
import { STRESS_THRESHOLDS } from 'constants/config';

describe('getStressLevel', () => {
  it('returns the correct stress level', () => {
    /* eslint-disable no-magic-numbers, camelcase */
    const plot = {
      data: { plant_status: null },
      timezone: 'GMT'
    };

    STRESS_THRESHOLDS.forEach((value, index) => {
      plot.data.indicator_value = index;
      expect(getStressLevel(plot)).toEqual(value);
    });
    /* eslint-enable no-magic-numbers, camelcase */
  });
});
