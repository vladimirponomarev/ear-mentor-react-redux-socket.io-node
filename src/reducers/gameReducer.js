import * as actionTypes from '../constants/actionTypes';


const initialState = {
  playerId: null,
  question: {},
  givenAnswer: '',
  incorrectAnswers: [],
  score: 0,
  rating: [],
  hasPlayerLost: false
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {

    case actionTypes.START_GAME:
      return Object.assign({}, state,
        { hasPlayerLost: false });

    case actionTypes.SET_PLAYER_ID:
      return Object.assign({}, state,
        { playerId: action.playerId });

    case actionTypes.OVER_GAME:
      return Object.assign({}, state,
        { hasPlayerLost: true });

    case actionTypes.SEND_ANSWER:
      return Object.assign({}, state,
        { givenAnswer: action.payload });

    case actionTypes.UPDATE_RATING:
      return Object.assign({}, state,
        { rating: action.rating });

    case actionTypes.UPDATE_PLAYER_SCORE:
      return Object.assign({}, state,
        { score: action.score });

    case actionTypes.COMPLETE_QUESTION_REQUEST:
      return Object.assign({}, state,
        { question: action.question, incorrectAnswers: [] });

    case actionTypes.CONFIRM_INCORRECT_ANSWER:
      return Object.assign({}, state,
        { incorrectAnswers: [...state.incorrectAnswers, state.givenAnswer] });

    default:
      return state;
  }
}
