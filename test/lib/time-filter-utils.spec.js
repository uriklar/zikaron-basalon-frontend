import moment from 'moment-timezone';
import { localizeMoment } from 'lib/utils';
import {
  createFilter, createWeekDates, createTwoWeeksDates, createMonthDates,
  __RewireAPI__ as RewireAPI
} from 'lib/time-filter-utils';

const BASE_DATE  = '2016-01-17T00:00:00.100+0000';
const START_DATE = '2015-09-09T00:00:00.100+0000';
const THIS_YEAR  = 0;
const LAST_YEAR  = 5;

describe('time-filter-utils', () => {

  beforeAll(() => {
    localizeMoment('NOT_ISRAEL');
    jasmine.clock().install();
    jasmine.clock().mockDate(moment(BASE_DATE).toDate());
  });

  afterAll(() => jasmine.clock().uninstall());

  // Unit test first verify that createFilter
  // correctly call child functions and test those separately

  [{ type: '7d', count: 18, func: createWeekDates },
   { type: '2w', count: 18, func: createTwoWeeksDates },
   { type: '1m', count: 4, func: createMonthDates }
  ].forEach((testCase) => {
    describe(`createFilter: ${testCase.type}`, () => {
      let buildList;

      beforeEach(() => {
        buildList = jasmine.createSpy('buildList').and.callFake(() => 'FAKE_DATA');
        RewireAPI.__Rewire__('buildList', buildList);
      });

      afterEach(() => RewireAPI.__ResetDependency__('buildList'));

      it('should return the value of buildList', () => {
        expect(createFilter(START_DATE, testCase.type)).toBe('FAKE_DATA');
      });

      it(`should call buildList with ${ testCase.type }`, () => {
        createFilter(START_DATE, testCase.type);
        expect(buildList).toHaveBeenCalledWith(testCase.func, testCase.count);
      });
    });
  });

  describe('season', () => {
    const createSeasonDatesSpy = jasmine.createSpy('createSeasonDates')
      .and.callFake(() => 'FAKE_DATA');

    beforeEach(() => RewireAPI.__Rewire__('createSeasonDates', createSeasonDatesSpy));
    afterEach(() => RewireAPI.__ResetDependency__('createSeasonDates'));

    it('should return the value of createSeasonDates', () => {
      expect(createFilter(START_DATE, 'season')).toEqual('FAKE_DATA');
    });

    it('should call createSeasonDates for season', () => {
      createFilter(START_DATE, 'season');
      expect(createSeasonDatesSpy).toHaveBeenCalledWith(START_DATE);
    });
  });

  describe('createWeekDates', () => {

    it('calculate in current year title', () => {
      expect(createWeekDates(THIS_YEAR).filterTitle).toEqual('2');
    });

    it('calculate in prev year to append year number to title', () => {
      expect(createWeekDates(LAST_YEAR).filterTitle).toEqual('50 2015');
    });

    it('calculate the startDate', () => {
      expect(createWeekDates(LAST_YEAR).startDate).toEqual('2015-12-07');
    });

    it('calculate the endDate', () => {
      expect(createWeekDates(LAST_YEAR).endDate).toEqual('2015-12-13');
    });
  });

  describe('createTwoWeeksDates', () => {
    it('calculate in current year title', () => {
      expect(createTwoWeeksDates(THIS_YEAR).filterTitle).toEqual('1 - 2');
    });

    it('calculate in between years title', () => {
      expect(createTwoWeeksDates(THIS_YEAR + 1).filterTitle).toEqual('53 2015 - 1');
    });

    it('calculate in prev year to append year number to title', () => {
      expect(createTwoWeeksDates(LAST_YEAR).filterTitle).toEqual('49 2015 - 50 2015');
    });

    it('calculate the startDate', () => {
      expect(createTwoWeeksDates(LAST_YEAR).startDate).toEqual('2015-11-30');
    });

    it('calculate the endDate', () => {
      expect(createTwoWeeksDates(LAST_YEAR).endDate).toEqual('2015-12-13');
    });
  });

  describe('createMonthDates', () => {
    it('calculate in current year title', () => {
      expect(createMonthDates(THIS_YEAR).filterTitle).toEqual('January');
    });

    it('calculate in between years title', () => {
      expect(createMonthDates(THIS_YEAR + 1).filterTitle).toEqual('December 2015');
    });

    it('calculate in prev year to append year number to title', () => {
      expect(createMonthDates(LAST_YEAR).filterTitle).toEqual('August 2015');
    });

    it('calculate the startDate', () => {
      expect(createMonthDates(LAST_YEAR).startDate).toEqual('2015-08-01');
    });

    it('calculate the endDate', () => {
      expect(createMonthDates(LAST_YEAR).endDate).toEqual('2015-08-31');
    });
  });
});
