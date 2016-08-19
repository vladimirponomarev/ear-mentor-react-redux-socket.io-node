/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import ratingReducer from './ratingReducer';
import * as ratingActions from '../actions/ratingActions';


describe('Settings Reducer', () => {
  const initialState = {
    players: []
  };

  it('should set players sorted by score', () => {
    const players = [
      { id: 1, name: 'John Doe', country: 'RU', score: 200 },
      { id: 2, name: 'Jane Doe', country: 'UK', score: 1000 }
    ];

    const action = ratingActions.updateRating(players);
    const finalState = ratingReducer(initialState, action);

    expect(finalState.players[0].score).toEqual(1000);
    expect(finalState.players[1].score).toEqual(200);
  });
});
