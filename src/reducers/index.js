import { combineReducers } from 'redux';
import environment from './environmentReducer';
import settings from './settingsReducer';
import game from './gameReducer';

const rootReducer = combineReducers({
  environment,
  settings,
  game
});

export default rootReducer;
