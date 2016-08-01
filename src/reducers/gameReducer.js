import * as actionTypes from '../constants/actionTypes';


const initialState = {
  playerId: null,
  question: {},
  answer: '',
  score: 0,
  rating: []
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {

    case actionTypes.SET_PLAYER_ID:
      return Object.assign({}, state,
        { playerId: action.playerId });

    case actionTypes.UPDATE_RATING:
      return Object.assign({}, state,
        { rating: action.rating });

    case actionTypes.UPDATE_PLAYER_SCORE:
      return Object.assign({}, state,
        { score: action.score });

    case actionTypes.COMPLETE_QUESTION_REQUEST:
      return Object.assign({}, state,
        { question: action.question });

    default:
      return state;
  }
}
