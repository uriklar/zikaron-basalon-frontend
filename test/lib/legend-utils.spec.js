import Immutable from 'seamless-immutable';
import { getLegendThresholds, mapLegendSettings } from 'lib/legend-utils';
import { LEGEND_VALUES } from 'constants/config';

const recommendedThresholdStressLevels = (arr) => {
  return arr.filter((threshold) => threshold.recommended)
            .map((threshold) => threshold.stressLevel);
};

const indexByStressLevel = (arr, stressLevel) => {
  return arr.findIndex((threshold) => threshold.stressLevel === stressLevel);
};

/* eslint-disable no-magic-numbers */
describe('getLegendThresholds', () => {
  it('should return array with correct start and end values', () => {
    const legendThresholds = getLegendThresholds(LEGEND_VALUES);

    expect([legendThresholds[0].start, legendThresholds[0].end]).toEqual([0, 20]);
    expect([legendThresholds[1].start, legendThresholds[1].end]).toEqual([20, 40]);
    expect([legendThresholds[4].start, legendThresholds[4].end]).toEqual([80, 100]);
  });

  it('should return the correct recommended thresholds', () => {
    const legendThresholds = getLegendThresholds(LEGEND_VALUES);
    const recommendedThresholdStressLevelNames = recommendedThresholdStressLevels(legendThresholds);

    expect(recommendedThresholdStressLevelNames).toEqual(['low', 'no', 'no-plus']);
  });
});


describe('hasLeftSlope', () => {
  it('should assign a left slope to the correct stress level bar', () => {
    const legendThresholds = mapLegendSettings(
      Immutable(getLegendThresholds(LEGEND_VALUES))
    );

    expect(legendThresholds[indexByStressLevel(legendThresholds, 'low')].leftSlope).toBe(true);
    expect(legendThresholds[indexByStressLevel(legendThresholds, 'no')].leftSlope).toBe(false);
    expect(legendThresholds[indexByStressLevel(legendThresholds, 'no-plus')].leftSlope).toBe(false);
  });
});
/* eslint-enable no-magic-numbers */
