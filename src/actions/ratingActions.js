import * as actionTypes from '../constants/actionTypes';

/* eslint-disable import/prefer-default-export */
export function updateRating(players) {
  return {
    type: actionTypes.UPDATE_RATING,
    players
  };
}

