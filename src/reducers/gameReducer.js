import * as actionTypes from '../constants/actionTypes';


const initialState = {
  playerId: null,
  question: {
    number: 0
  },
  givenAnswer: '',
  incorrectAnswers: [],
  score: 0
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {

    case actionTypes.START_GAME:
      return Object.assign({}, state,
        { score: 0, question: { number: 0 } });

    case actionTypes.SET_PLAYER_ID:
      return Object.assign({}, state,
        { playerId: action.playerId });

    case actionTypes.SEND_ANSWER:
      return Object.assign({}, state,
        { givenAnswer: action.payload });

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
