import * as actionTypes from '../constants/actionTypes';

export function sendAnswer(answer) {
  return {
    type: actionTypes.SEND_ANSWER,
    payload: answer
  };
}

export function setPlayerId(playerId) {
  return {
    type: actionTypes.SET_PLAYER_ID,
    playerId
  };
}

export function updateRating(rating) {
  return {
    type: actionTypes.UPDATE_RATING,
    rating
  };
}

export function overGame() {
  return {
    type: actionTypes.OVER_GAME
  };
}

export function updatePlayerScore(score) {
  return {
    type: actionTypes.UPDATE_PLAYER_SCORE,
    score
  };
}


export function requestQuestion() {
  return {
    type: actionTypes.REQUEST_QUESTION,
    payload: {}
  };
}

export function completeQuestionRequest(question) {
  return {
    type: actionTypes.COMPLETE_QUESTION_REQUEST,
    question
  };
}

export function confirmIncorrectAnswer(incorrectAnswer) {
  return {
    type: actionTypes.CONFIRM_INCORRECT_ANSWER,
    incorrectAnswer
  };
}

export function confirmCorrectAnswer() {
  return {
    type: actionTypes.CONFIRM_CORRECT_ANSWER
  };
}
