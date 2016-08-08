import * as actionTypes from '../constants/actionTypes';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';
import * as musicalInstruments from '../constants/musicalInstruments';


const initialState = {
  intervals: [
    musicalIntervals.MINOR_SECOND,
    musicalIntervals.PERFECT_FIFTH,
    musicalIntervals.PERFECT_OCTAVE
  ],
  directions: [
    musicalIntervalDirections.ASC
  ],
  instrument: musicalInstruments.BASS,
  country: '',
  name: ''
};

function toggleArrayValue(itemList, item) {
  if (itemList.indexOf(item) !== -1) {
    return itemList.filter((element) => element !== item);
  }

  return [...itemList, item];
}

function selectAllIntervals() {
  return Object.keys(musicalIntervals).map((key) => musicalIntervals[key]);
}

function randomizeIntervals() {
  const keys = Object.keys(musicalIntervals).filter(() => Math.random() > Math.random());

  return keys.map((key) => musicalIntervals[key]);
}


export default function settingsReducer(state = initialState, action) {
  switch (action.type) {

    case actionTypes.CHANGE_PLAYER_NAME:
      return Object.assign({}, state,
        { name: action.name });

    case actionTypes.CHANGE_PLAYER_COUNTRY:
      return Object.assign({}, state,
        { country: action.country });

    case actionTypes.SET_INSTRUMENT:
      return Object.assign({}, state,
        { instrument: action.instrument });

    case actionTypes.TOGGLE_MUSICAL_INTERVAL:
      return Object.assign({}, state,
        { intervals: toggleArrayValue(state.intervals, action.interval) });

    case actionTypes.SELECT_ALL_INTERVALS:
      return Object.assign({}, state,
        { intervals: selectAllIntervals() });

    case actionTypes.RANDOMIZE_INTERVALS:
      return Object.assign({}, state,
        { intervals: randomizeIntervals() });

    case actionTypes.TOGGLE_MUSICAL_INTERVAL_DIRECTION:
      return Object.assign({}, state,
        { directions: toggleArrayValue(state.directions, action.direction) });

    default:
      return state;
  }
}
