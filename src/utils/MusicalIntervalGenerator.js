import Validator from '../utils/Validator';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';
import * as musicalNotes from '../constants/musicalNotes';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}


class MusicalIntervalGenerator {

  constructor({ instrument, directions, intervals }) {
    if (!Validator.isInstrumentValid(instrument)) {
      throw new Error('Instrument is invalid');
    }

    if (!Validator.getValidDirectionCount(directions) === 0) {
      throw new Error('The direction set is invalid');
    }

    if (!Validator.getValidIntervalCount(intervals) === 0) {
      throw new Error('The interval set is invalid');
    }

    this.instrument = instrument;
    this.directions = directions;
    this.intervals = intervals;
  }

  generate() {
    const firstNoteIndex = this._generateFirstNoteIndex();
    const secondNoteIndex = this._generateSecondNoteIndex(firstNoteIndex);


    return [firstNoteIndex, secondNoteIndex];
  }

  _getMinPossibleInterval() {
    return Math.min(...this.intervals);
  }

  _generateFirstNoteIndex() {
    const range = {
      min: musicalNotes.RANGE[this.instrument].min,
      max: musicalNotes.RANGE[this.instrument].max
    };
    const hasAscDirection = this.directions.includes(musicalIntervalDirections.ASC);
    const hasDescDirection = this.directions.includes(musicalIntervalDirections.DESC);


    if (hasAscDirection && !hasDescDirection) {
      range.min = musicalNotes.RANGE[this.instrument].min;
      range.max = musicalNotes.RANGE[this.instrument].max - this._getMinPossibleInterval();
    } else if (!hasAscDirection && hasDescDirection) {
      range.min = musicalNotes.RANGE[this.instrument].min + this._getMinPossibleInterval();
      range.max = musicalNotes.NOTES.length;
    }


    return getRandomInt(range.min, range.max);
  }

  _generateSecondNoteIndex(firstNoteIndex) {
    const possibleIntervals = [];
    const range = {
      min: 0,
      max: 0
    };

    if (this.directions.includes(musicalIntervalDirections.ASC)) {
      this.intervals.forEach((interval) => {
        if (firstNoteIndex + interval <= musicalNotes.RANGE[this.instrument].max) {
          possibleIntervals.push(firstNoteIndex + interval);
        }
      });
    }

    if (this.directions.includes(musicalIntervalDirections.DESC)) {
      this.intervals.forEach((interval) => {
        if (firstNoteIndex - interval >= musicalNotes.RANGE[this.instrument].min) {
          possibleIntervals.push(firstNoteIndex - interval);
        }
      });
    }

    range.max = possibleIntervals.length - 1;
    const randomDigit = getRandomInt(range.min, range.max);

    return possibleIntervals[randomDigit];
  }

}

export default MusicalIntervalGenerator;
