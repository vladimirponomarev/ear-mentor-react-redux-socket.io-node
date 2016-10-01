/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import settingsReducer from './settingsReducer';
import * as settingsActions from '../actions/settingsActions';
import * as musicalInstruments from '../constants/musicalInstruments';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';

const initialState = {
  intervals: [],
  directions: [],
  instrument: '',
  country: '',
  name: '',
  volume: 1,
  tempo: 100
};

describe('Settings Reducer', () => {
  it('should set a musical instrument', () => {
    const instrument = musicalInstruments.BASS;

    const action = settingsActions.setInstrument(instrument);

    const finalState = settingsReducer(initialState, action);
    expect(finalState.instrument).toEqual(instrument);
  });

  it("should change player's name", () => {
    const name = "John Doe";

    const action = settingsActions.changeName(name);

    const finalState = settingsReducer(initialState, action);
    expect(finalState.name).toEqual(name);
  });

  it("should change player's country", () => {
    const country = "RU";

    const action = settingsActions.changeCountry(country);

    const finalState = settingsReducer(initialState, action);
    expect(finalState.country).toEqual(country);
  });

  it("should set a musical interval direction", () => {
    const action1 = settingsActions.toggleMusicalIntervalDirection(musicalIntervalDirections.ASC);
    const state1 = settingsReducer(initialState, action1);
    const action2 = settingsActions.toggleMusicalIntervalDirection(musicalIntervalDirections.DESC);
    const state2 = settingsReducer(state1, action2);
    const action3 = settingsActions.toggleMusicalIntervalDirection(musicalIntervalDirections.ASC);
    const finalState = settingsReducer(state2, action3);


    expect(finalState.directions).toEqual([musicalIntervalDirections.DESC]);
  });

  it("should set musical intervals", () => {
    const action1 = settingsActions.toggleMusicalInterval(musicalIntervals.MINOR_SECOND);
    const state1 = settingsReducer(initialState, action1);
    const action2 = settingsActions.toggleMusicalInterval(musicalIntervals.MINOR_SECOND);
    const state2 = settingsReducer(state1, action2);
    const action3 = settingsActions.toggleMusicalInterval(musicalIntervals.PERFECT_FIFTH);
    const finalState = settingsReducer(state2, action3);


    expect(finalState.intervals).toEqual([musicalIntervals.PERFECT_FIFTH]);
  });

  it("should randomize musical intervlas", () => {
    const action = settingsActions.toggleMusicalInterval(musicalIntervals.MINOR_SECOND);
    const finalState = settingsReducer(initialState, action);


    expect(finalState.intervals.length).toBeGreaterThan(0);
  });

  it("should select all musical intervals", () => {
    const action = settingsActions.selectAllIntervals();
    const finalState = settingsReducer(initialState, action);

    // there is only 12 semitones
    expect(finalState.intervals.length).toEqual(12);
  });
});
