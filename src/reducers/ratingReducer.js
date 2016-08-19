import * as actionTypes from '../constants/actionTypes';


const initialState = {
  players: []
};

export default function ratingReducer(state = initialState, action) {
  switch (action.type) {

    case actionTypes.UPDATE_RATING:
      return Object.assign({}, state,
        { players: action.players.sort((a, b) => b.score - a.score) });

    default:
      return state;
  }
}
