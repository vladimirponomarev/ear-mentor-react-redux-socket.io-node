/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import calculateScorePoints from './calculateScorePoints';
import * as musicalIntervals from '../constants/musicalIntervals';


describe('Testing the calculateScorePoint function', () => {
  it('should get the score point equals to 2 when only three intervals selected', () => {
    const result = calculateScorePoints({
      intervals: [
        musicalIntervals.MINOR_SECOND,
        musicalIntervals.MAJOR_THIRD,
        musicalIntervals.TRITONE
      ],
      directions: [musicalIntervals.DIRECTION_ASC]
    });

    expect(result).toEqual(2);
  });

  it('should get the score point equals to 4 when three intervals selected (asc/desc)', () => {
    const result = calculateScorePoints({
      intervals: [
        musicalIntervals.MINOR_SECOND,
        musicalIntervals.MAJOR_THIRD,
        musicalIntervals.TRITONE
      ],
      directions: [musicalIntervals.DIRECTION_ASC, musicalIntervals.DIRECTION_DESC]
    });

    expect(result).toEqual(4);
  });

  it('should get the score point equals to 11 when all intervals selected (asc)', () => {
    const result = calculateScorePoints({
      intervals: [
        musicalIntervals.MINOR_SECOND,
        musicalIntervals.MAJOR_SECOND,
        musicalIntervals.MINOR_THIRD,
        musicalIntervals.MAJOR_THIRD,
        musicalIntervals.PERFECT_FOURTH,
        musicalIntervals.TRITONE,
        musicalIntervals.PERFECT_FIFTH,
        musicalIntervals.MINOR_SIXTH,
        musicalIntervals.MAJOR_SIXTH,
        musicalIntervals.MINOR_SEVENTH,
        musicalIntervals.MAJOR_SEVENTH,
        musicalIntervals.PERFECT_OCTAVE
      ],
      directions: [musicalIntervals.DIRECTION_ASC]
    });

    expect(result).toEqual(11);
  });

  it('should get the score point equals to 11 when all intervals selected (desc)', () => {
    const result = calculateScorePoints({
      intervals: [
        musicalIntervals.MINOR_SECOND,
        musicalIntervals.MAJOR_SECOND,
        musicalIntervals.MINOR_THIRD,
        musicalIntervals.MAJOR_THIRD,
        musicalIntervals.PERFECT_FOURTH,
        musicalIntervals.TRITONE,
        musicalIntervals.PERFECT_FIFTH,
        musicalIntervals.MINOR_SIXTH,
        musicalIntervals.MAJOR_SIXTH,
        musicalIntervals.MINOR_SEVENTH,
        musicalIntervals.MAJOR_SEVENTH,
        musicalIntervals.PERFECT_OCTAVE
      ],
      directions: [musicalIntervals.DIRECTION_DESC]
    });

    expect(result).toEqual(11);
  });

  it('should get the score point equals to 22 when all intervalahs selected (desc)', () => {
    const result = calculateScorePoints({
      intervals: [
        musicalIntervals.MINOR_SECOND,
        musicalIntervals.MAJOR_SECOND,
        musicalIntervals.MINOR_THIRD,
        musicalIntervals.MAJOR_THIRD,
        musicalIntervals.PERFECT_FOURTH,
        musicalIntervals.TRITONE,
        musicalIntervals.PERFECT_FIFTH,
        musicalIntervals.MINOR_SIXTH,
        musicalIntervals.MAJOR_SIXTH,
        musicalIntervals.MINOR_SEVENTH,
        musicalIntervals.MAJOR_SEVENTH,
        musicalIntervals.PERFECT_OCTAVE
      ],
      directions: [musicalIntervals.DIRECTION_ASC, musicalIntervals.DIRECTION_DESC]
    });

    expect(result).toEqual(22);
  });
});
