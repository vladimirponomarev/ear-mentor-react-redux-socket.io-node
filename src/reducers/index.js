import { combineReducers } from 'redux';
import environment from './environmentReducer';
import settings from './settingsReducer';
import game from './gameReducer';
import rating from './ratingReducer';

const rootReducer = combineReducers({
  environment,
  settings,
  game,
  rating
});

export default rootReducer;
