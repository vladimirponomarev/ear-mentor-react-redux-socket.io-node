import * as musicalIntervals from '../constants/musicalIntervals';

export default function calculateScorePoint(settings) {
  const intervals = settings.intervals;
  const directions = settings.directions;

  if (!intervals || !Array.isArray(intervals)) {
    throw new Error("'intervals' must be an array");
  }

  if (!directions || !Array.isArray(directions)) {
    throw new Error("'directions' must be an array");
  }


  const hasAscDirection = directions.includes(musicalIntervals.DIRECTION_ASC);
  const hasDescDirection = directions.includes(musicalIntervals.DIRECTION_DESC);
  let scorePoints = -1;
  scorePoints += intervals.includes(musicalIntervals.MINOR_SECOND) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.MAJOR_SECOND) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.MINOR_THIRD) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.MAJOR_THIRD) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.PERFECT_FOURTH) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.TRITONE) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.PERFECT_FIFTH) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.MINOR_SIXTH) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.MAJOR_SIXTH) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.MINOR_SEVENTH) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.MAJOR_SEVENTH) ? 1 : 0;
  scorePoints += intervals.includes(musicalIntervals.PERFECT_OCTAVE) ? 1 : 0;

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
