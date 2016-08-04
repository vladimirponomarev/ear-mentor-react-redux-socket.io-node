/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import { isSettingsDataValid, isCountryCodeValid } from './validator';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalInstruments from '../constants/musicalInstruments';

describe('Testing utils/validator', () => {
  it('should pass the country code validation', () => {
    const result = isCountryCodeValid('RU');

    expect(result).toBeTruthy();
  });

  it('should not pass the country code validation', () => {
    const result = isCountryCodeValid('INCORRECT_CODE');

    expect(result).toBeFalsy();
  });

  it('should not pass the validation because only one interval selected', () => {
    const result = isSettingsDataValid({
      directions: [musicalIntervals.DIRECTION_ASC],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    expect(result.errors.intervals).toNotBe(undefined);
    expect(result.errors.directions).toBe(undefined);
    expect(result.errors.instrument).toBe(undefined);
    expect(result.errors.country).toBe(undefined);
    expect(result.errors.name).toBe(undefined);
  });

  it('should pass the validation because one interval selected, but in asc and desc', () => {
    const result = isSettingsDataValid({
      directions: [musicalIntervals.DIRECTION_ASC, musicalIntervals.DIRECTION_DESC],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    expect(result.errors.intervals).toBe(undefined);
    expect(result.errors.directions).toBe(undefined);
    expect(result.errors.instrument).toBe(undefined);
    expect(result.errors.country).toBe(undefined);
    expect(result.errors.name).toBe(undefined);
  });

  it('should not pass the validation because none directions selected', () => {
    const result = isSettingsDataValid({
      directions: [],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    expect(result.errors.intervals).toBe(undefined);
    expect(result.errors.directions).toNotBe(undefined);
    expect(result.errors.instrument).toBe(undefined);
    expect(result.errors.country).toBe(undefined);
    expect(result.errors.name).toBe(undefined);
  });

  it('should not pass the validation because passed an incorrect instrument', () => {
    const result = isSettingsDataValid({
      directions: [musicalIntervals.DIRECTION_ASC],
      intervals: [musicalIntervals.MAJOR_SECOND, musicalIntervals.PERFECT_FOURTH],
      instrument: 'INCORRECT_INSTRUMENT',
      country: 'RU',
      name: 'John Doe'
    });

    expect(result.errors.intervals).toBe(undefined);
    expect(result.errors.directions).toBe(undefined);
    expect(result.errors.instrument).toNotBe(undefined);
    expect(result.errors.country).toBe(undefined);
    expect(result.errors.name).toBe(undefined);
  });

  it('should not pass the validation because passed an incorrect country code', () => {
    const result = isSettingsDataValid({
      directions: [musicalIntervals.DIRECTION_ASC],
      intervals: [musicalIntervals.MAJOR_SECOND, musicalIntervals.PERFECT_FOURTH],
      instrument: musicalInstruments.BASS,
      country: 'INCORRECT_CODE',
      name: 'John Doe'
    });

    expect(result.errors.intervals).toBe(undefined);
    expect(result.errors.directions).toBe(undefined);
    expect(result.errors.instrument).toBe(undefined);
    expect(result.errors.country).toNotBe(undefined);
    expect(result.errors.name).toBe(undefined);
  });

  it('should not pass the validation because passed an empty name', () => {
    const result = isSettingsDataValid({
      directions: [musicalIntervals.DIRECTION_ASC],
      intervals: [musicalIntervals.MAJOR_SECOND, musicalIntervals.PERFECT_FOURTH],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: ''
    });

    expect(result.errors.intervals).toBe(undefined);
    expect(result.errors.directions).toBe(undefined);
    expect(result.errors.instrument).toBe(undefined);
    expect(result.errors.country).toBe(undefined);
    expect(result.errors.name).toNotBe(undefined);
  });
});
