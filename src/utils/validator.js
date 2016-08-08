import { getCountryByCode } from './country';
import * as musicalInstruments from '../constants/musicalInstruments';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';

export function isCountryCodeValid(code) {
  return getCountryByCode(code) !== undefined;
}

export function isSettingsDataValid(settings) {
  const errors = {};

  let isValid = true;
  let directionCount = 0;
  let intervalCount = 0;
  let isInstrumentValid = false;

  if (settings && typeof settings.instrument === 'string') {
    isInstrumentValid = Object.keys(musicalInstruments)
                              .some(key => musicalInstruments[key] === settings.instrument);
  }


  if (settings && Array.isArray(settings.directions)) {
    directionCount += settings.directions.includes(musicalIntervalDirections.ASC) ? 1 : 0;
    directionCount += settings.directions.includes(musicalIntervalDirections.DESC) ? 1 : 0;
  }


  if (settings && Array.isArray(settings.intervals)) {
    Object.keys(musicalIntervals).forEach((interval) => {
      if (settings.intervals.includes(musicalIntervals[interval])) {
        intervalCount++;
      }
    });
  }


  if (!isInstrumentValid) {
    errors.instrument = 'Please choose an available instrument.';
    isValid = false;
  }

  if (directionCount === 0) {
    errors.directions = 'Please choose at least one interval direction.';
    isValid = false;
  }

  if (intervalCount === 1 && directionCount === 1) {
    errors.intervals = `Please choose at least two intervals or consider to add another direction.`;
    isValid = false;
  } else if (intervalCount === 0) {
    errors.intervals = 'Please choose at least two intervals.';
    isValid = false;
  }

  if (!settings || typeof settings.name !== 'string' || settings.name.trim().length === 0) {
    errors.name = 'Please provide your name.';
    isValid = false;
  }

  if (!settings || typeof settings.country !== 'string' || !isCountryCodeValid(settings.country)) {
    errors.country = 'Please provide your country.';
    isValid = false;
  }

  return {
    isValid,
    errors
  };
}
