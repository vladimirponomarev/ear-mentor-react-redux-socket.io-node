import * as actionTypes from '../constants/actionTypes';

/* eslint-disable import/prefer-default-export */
export function updateCurrentPlayers(players) {
  return {
    type: actionTypes.UPDATE_CURRENT_PLAYERS,
    players
  };
}

export function requestRating(period) {
  return {
    type: actionTypes.REQUEST_RATING,
    payload: period
  };
}

export function setRating(rating) {
  return {
    type: actionTypes.SET_RATING,
    rating
  };
}

