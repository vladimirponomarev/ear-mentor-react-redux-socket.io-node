import * as actionTypes from '../constants/actionTypes';


const initialState = {
  currentPlayers: [],
  rating: []
};

export default function ratingReducer(state = initialState, action) {
  switch (action.type) {

    case actionTypes.UPDATE_CURRENT_PLAYERS:
      return Object.assign({}, state,
        { currentPlayers: action.players.sort((a, b) => b.score - a.score) });

    case actionTypes.SET_RATING:
      return Object.assign({}, state, { rating: action.rating });

    default:
      return state;
  }
}
