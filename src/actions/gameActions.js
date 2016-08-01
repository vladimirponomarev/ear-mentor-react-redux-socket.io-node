import * as actionTypes from '../constants/actionTypes';

export function sendAnswer(answer, type) {
  return {
    type: actionTypes.SEND_ANSWER,
    payload: {
      answer,
      type
    }
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
