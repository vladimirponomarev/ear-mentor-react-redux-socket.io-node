/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import Validator from './Validator';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';
import * as musicalInstruments from '../constants/musicalInstruments';


describe('Validator', () => {
  it('should pass the country code validation when given a correct code', () => {
    const result = Validator.isCountryCodeValid('RU');

    expect(result).toBeTruthy();
  });

  it('should not pass the country code validation when given an incorrect code', () => {
    const result = Validator.isCountryCodeValid('INCORRECT_CODE');

    expect(result).toBeFalsy();
  });

  it('should not pass the instrument validation when given an incorrect instrument', () => {
    const result = Validator.isInstrumentValid('INCORRECT_INSTRUMENT');

    expect(result).toBeFalsy();
  });

  it('should pass the instrument validation when given a correct instrument', () => {
    const result = Validator.isInstrumentValid(musicalInstruments.GUITAR);

    expect(result).toBeTruthy();
  });

  it('should get the correct count when given non-valid direction values', () => {
    const result = Validator.getValidDirectionCount(['INCORRECT_VALUE', 'INCORRECT_VALUE_2']);

    expect(result).toBe(0);
  });

  it('should get the correct count when given valid direction values', () => {
    const result = Validator.getValidDirectionCount([musicalIntervalDirections.ASC]);

    expect(result).toBe(1);
  });

  it('should get the correct count when given non-valid musical interval values', () => {
    const result = Validator.getValidIntervalCount(['INCORRECT_VALUE']);

    expect(result).toBe(0);
  });

  it('should get the correct count when given valid musical interval values', () => {
    const result = Validator.getValidIntervalCount([
      musicalIntervals.MAJOR_SECOND,
      musicalIntervals.PERFECT_FOURTH,
      musicalIntervals.PERFECT_OCTAVE
    ]);

    expect(result).toBe(3);
  });

  it('should not pass the string validation when given an empty string', () => {
    const result = Validator.isStringNotEmpty('');

    expect(result).toBeFalsy();
  });

  it('should not pass the string validation when given an empty string with untrimmed whitespaces', () => {
    const result = Validator.isStringNotEmpty('\n   \t');

    expect(result).toBeFalsy();
  });

  it('should pass the string validation when given a non-empty string', () => {
    const result = Validator.isStringNotEmpty('Hello');

    expect(result).toBeTruthy();
  });
});
