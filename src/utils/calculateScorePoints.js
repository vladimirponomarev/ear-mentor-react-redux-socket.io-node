import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';

export default function calculateScorePoint(settings) {
  const intervals = settings.intervals;
  const directions = settings.directions;

  if (!intervals || !Array.isArray(intervals)) {
    throw new Error("'intervals' must be an array");
  }

  if (!directions || !Array.isArray(directions)) {
    throw new Error("'directions' must be an array");
  }


  const hasAscDirection = directions.includes(musicalIntervalDirections.ASC);
  const hasDescDirection = directions.includes(musicalIntervalDirections.DESC);
  let scorePoints = -1;

  Object.keys(musicalIntervals).forEach((interval) => {
    if (intervals.includes(musicalIntervals[interval])) {
      scorePoints++;
    }
  });

  if (hasAscDirection && hasDescDirection && scorePoints === 0) {
    scorePoints = 1;
  } else if (hasAscDirection && hasDescDirection) {
    scorePoints *= 2;
  }

  if (scorePoints < 0) {
    scorePoints = 0;
  }

  return scorePoints;
}
