import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalNotes from '../constants/musicalNotes';


let instrument;
let directions;
let intervals;

function getMinPossibleInterval() {
  return Math.min(...intervals);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function generateFirstNoteIndex() {
  const range = {
    min: musicalNotes.RANGE[instrument].min,
    max: musicalNotes.RANGE[instrument].max
  };
  const hasAscDirection = directions.includes(musicalIntervals.DIRECTION_ASC);
  const hasDescDirection = directions.includes(musicalIntervals.DIRECTION_DESC);


  if (hasAscDirection && !hasDescDirection) {
    range.min = musicalNotes.RANGE[instrument].min;
    range.max = musicalNotes.RANGE[instrument].max - getMinPossibleInterval();
  } else if (!hasAscDirection && hasDescDirection) {
    range.min = getMinPossibleInterval();
    range.max = musicalNotes.NOTES.length;
  }

  return getRandomInt(range.min, range.max);
}

function generateSecondNoteIndex(firstNoteIndex) {
  const possibleIntervals = [];
  const range = {
    min: 0,
    max: 0
  };

  if (directions.includes(musicalIntervals.DIRECTION_ASC)) {
    intervals.forEach((interval) => {
      if (firstNoteIndex + interval <= musicalNotes.RANGE[instrument].max) {
        possibleIntervals.push(firstNoteIndex + interval);
      }
    });
  }

  if (directions.includes(musicalIntervals.DIRECTION_DESC)) {
    intervals.forEach((interval) => {
      if (firstNoteIndex - interval >= musicalNotes.RANGE[instrument].min) {
        possibleIntervals.push(firstNoteIndex - interval);
      }
    });
  }

  range.max = possibleIntervals.length - 1;
  const randomDigit = getRandomInt(range.min, range.max);

  return possibleIntervals[randomDigit];
}


export default function (settings) {
  instrument = settings.instrument;
  directions = settings.directions;
  intervals = settings.intervals;

  const firstNoteIndex = generateFirstNoteIndex();
  const secondNoteIndex = generateSecondNoteIndex(firstNoteIndex);

  return [firstNoteIndex, secondNoteIndex];
}
