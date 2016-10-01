import Country from './Country';
import * as musicalInstruments from '../constants/musicalInstruments';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';

class Validator {

  static isCountryCodeValid(code) {
    return typeof code === 'string' && Country.getByCode(code) !== undefined;
  }

  static isInstrumentValid(instrument) {
    return typeof instrument === 'string' &&
           Object.keys(musicalInstruments).some(key => musicalInstruments[key] === instrument);
  }

  static getValidDirectionCount(directions) {
    let directionCount = 0;

    if (Array.isArray(directions)) {
      directionCount += directions.includes(musicalIntervalDirections.ASC) ? 1 : 0;
      directionCount += directions.includes(musicalIntervalDirections.DESC) ? 1 : 0;
    }

    return directionCount;
  }

  static getValidIntervalCount(intervals) {
    let intervalCount = 0;

    if (Array.isArray(intervals)) {
      Object.keys(musicalIntervals).forEach((interval) => {
        intervalCount += intervals.includes(musicalIntervals[interval]) ? 1 : 0;
      });
    }

    return intervalCount;
  }

  static isStringNotEmpty(value) {
    return typeof value === 'string' && value.trim().length !== 0;
  }

  static isSettingsDataValid(settings) {
    const errors = {};
    const validDirectionCount = this.getValidDirectionCount(settings.directions);
    const validIntervalCount = this.getValidIntervalCount(settings.intervals);
    let isValid = true;


    if (!this.isInstrumentValid(settings.instrument)) {
      errors.instrument = 'Please choose an available instrument.';
      isValid = false;
    }

    if (validDirectionCount === 0) {
      errors.directions = 'Please choose at least one interval direction.';
      isValid = false;
    }

    if (validIntervalCount < 3 && validDirectionCount === 1) {
      errors.intervals = `Please choose at least three intervals or consider to add another direction.`;
      isValid = false;
    } else if (validIntervalCount === 0 && validDirectionCount <= 2) {
      errors.intervals = 'Please choose at least three intervals.';
      isValid = false;
    }

    if (!this.isStringNotEmpty(settings.name)) {
      errors.name = 'Please provide your name.';
      isValid = false;
    }

    if (!this.isCountryCodeValid(settings.country)) {
      errors.country = 'Please provide your country.';
      isValid = false;
    }

    return {
      isValid,
      errors
    };
  }

}

export default Validator;
