import { getCountryByCode } from './country';
import * as musicalInstruments from '../constants/musicalInstruments';
import * as musicalIntervals from '../constants/musicalIntervals';

export function isCountryCodeValid(code) {
  return getCountryByCode(code) !== undefined;
}

export function isSettingsDataValid(settings) {
  const errors = {};
  const isInstrumentValid = Object.keys(musicalInstruments)
                                  .some(key => musicalInstruments[key] === settings.instrument);

  let isValid = true;
  let directionCount = 0;
  let intervalCount = 0;


  directionCount += settings.directions.includes(musicalIntervals.DIRECTION_ASC) ? 1 : 0;
  directionCount += settings.directions.includes(musicalIntervals.DIRECTION_DESC) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.MINOR_SECOND) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.MAJOR_SECOND) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.MINOR_THIRD) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.MAJOR_THIRD) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.PERFECT_FOURTH) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.TRITONE) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.PERFECT_FIFTH) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.MINOR_SIXTH) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.MAJOR_SIXTH) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.MINOR_SEVENTH) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.MAJOR_SEVENTH) ? 1 : 0;
  intervalCount += settings.intervals.includes(musicalIntervals.PERFECT_OCTAVE) ? 1 : 0;


  if (!isInstrumentValid) {
    errors.instrument = 'Please choose an available instrument.';
    isValid = false;
  }

  if (directionCount === 0) {
    errors.directions = 'Please choose at least one interval direction.';
    isValid = false;
  }

  if (intervalCount === 1 && directionCount === 1) {
    errors.intervals = 'Please choose at least two intervals ' +
      'or consider to add another direction.';
    isValid = false;
  } else if (intervalCount === 0) {
    errors.intervals = 'Please choose at least two intervals.';
    isValid = false;
  }

  if (settings.name.trim().length === 0) {
    errors.name = 'Please provide your name.';
    isValid = false;
  }

  if (!isCountryCodeValid(settings.country)) {
    errors.country = 'Please provide your country.';
    isValid = false;
  }

  return {
    isValid,
    errors
  };
}
