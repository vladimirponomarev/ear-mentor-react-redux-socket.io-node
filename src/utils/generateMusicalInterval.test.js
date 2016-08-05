/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import generateMusicalInterval from './generateMusicalInterval';
import * as musicalInstrument from '../constants/musicalInstruments';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalNotes from '../constants/musicalNotes';

describe('Testing musical interval generation', () => {
  it('should always get the perfect fifth interval (asc)', () => {
    const settings = {
      instrument: musicalInstrument.BASS,
      intervals: [musicalIntervals.PERFECT_FIFTH],
      directions: [musicalIntervals.DIRECTION_ASC]
    };
    const notes = generateMusicalInterval(settings);

    expect(notes[1]).toEqual(notes[0] + musicalIntervals.PERFECT_FIFTH);
  });

  it('should always get the perfect fifth interval (desc)', () => {
    const settings = {
      instrument: musicalInstrument.BASS,
      intervals: [musicalIntervals.PERFECT_FIFTH],
      directions: [musicalIntervals.DIRECTION_DESC]
    };

    const notes = generateMusicalInterval(settings);

    expect(notes[1]).toEqual(notes[0] - musicalIntervals.PERFECT_FIFTH);
  });

  it('should always get the perfect fifth interval (asc or desc)', () => {
    const settings = {
      instrument: musicalInstrument.BASS,
      intervals: [musicalIntervals.PERFECT_FIFTH],
      directions: [musicalIntervals.DIRECTION_ASC, musicalIntervals.DIRECTION_DESC]
    };

    const notes = generateMusicalInterval(settings);
    const possibleValues = [
      notes[0] - musicalIntervals.PERFECT_FIFTH,
      notes[0] + musicalIntervals.PERFECT_FIFTH
    ];

    expect(possibleValues).toContain(notes[1]);
  });

  it('should always get the minor second/major third/tritone intervals (asc)', () => {
    const settings = {
      instrument: musicalInstrument.BASS,
      intervals: [
        musicalIntervals.MINOR_SECOND,
        musicalIntervals.MAJOR_THIRD,
        musicalIntervals.TRITONE
      ],
      directions: [musicalIntervals.DIRECTION_ASC]
    };

    const notes = generateMusicalInterval(settings);
    const possibleValues = [
      notes[0] + musicalIntervals.MINOR_SECOND,
      notes[0] + musicalIntervals.MAJOR_THIRD,
      notes[0] + musicalIntervals.TRITONE
    ];

    expect(possibleValues).toContain(notes[1]);
  });

  it('should always get the minor second/major third/tritone intervals (desc)', () => {
    const settings = {
      instrument: musicalInstrument.BASS,
      intervals: [
        musicalIntervals.MINOR_SECOND,
        musicalIntervals.MAJOR_THIRD,
        musicalIntervals.TRITONE
      ],
      directions: [musicalIntervals.DIRECTION_DESC]
    };

    const notes = generateMusicalInterval(settings);
    const possibleValues = [
      notes[0] - musicalIntervals.MINOR_SECOND,
      notes[0] - musicalIntervals.MAJOR_THIRD,
      notes[0] - musicalIntervals.TRITONE
    ];

    expect(possibleValues).toContain(notes[1]);
  });

  it('should always get the minor second/major third/tritone intervals (asc or desc)', () => {
    const settings = {
      instrument: musicalInstrument.BASS,
      intervals: [
        musicalIntervals.MINOR_SECOND,
        musicalIntervals.MAJOR_THIRD,
        musicalIntervals.TRITONE
      ],
      directions: [musicalIntervals.DIRECTION_ASC, musicalIntervals.DIRECTION_DESC]
    };

    const notes = generateMusicalInterval(settings);
    const possibleValues = [
      notes[0] - musicalIntervals.MINOR_SECOND,
      notes[0] - musicalIntervals.MAJOR_THIRD,
      notes[0] - musicalIntervals.TRITONE,
      notes[0] + musicalIntervals.MINOR_SECOND,
      notes[0] + musicalIntervals.MAJOR_THIRD,
      notes[0] + musicalIntervals.TRITONE
    ];

    expect(possibleValues).toContain(notes[1]);
  });

  it('should always get intervals in the musical instrument range', () => {
    const instrument = musicalInstrument.BASS;

    const settings = {
      instrument,
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
        musicalIntervals.MAJOR_SEVENTH
      ],
      directions: [musicalIntervals.DIRECTION_ASC, musicalIntervals.DIRECTION_DESC]
    };

    const notes = generateMusicalInterval(settings);

    expect(notes[0]).toBeGreaterThanOrEqualTo(musicalNotes.RANGE[instrument].min);
    expect(notes[1]).toBeLessThanOrEqualTo(musicalNotes.RANGE[instrument].max);
  });
});
