/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import ratingReducer from './ratingReducer';
import * as ratingActions from '../actions/ratingActions';


describe('Rating Reducer', () => {
  const initialState = {
    currentPlayers: [],
    rating: []
  };

  it('should set players sorted by score', () => {
    const players = [
      { id: 1, name: 'John Doe', country: 'RU', score: 200 },
      { id: 2, name: 'Jane Doe', country: 'UK', score: 1000 }
    ];

    const action = ratingActions.updateCurrentPlayers(players);
    const finalState = ratingReducer(initialState, action);

    expect(finalState.currentPlayers[0].score).toEqual(1000);
    expect(finalState.currentPlayers[1].score).toEqual(200);
  });

  it('should set a rating for a some period', () => {
    const rating = [
      { date: new Date(), name: 'Jane Doe', country: 'UK', score: 1000 },
      { date: new Date(), name: 'John Doe', country: 'RU', score: 200 }
    ];

    const action = ratingActions.setRating(rating);
    const finalState = ratingReducer(initialState, action);

    expect(finalState.rating[0].score).toEqual(1000);
    expect(finalState.rating[1].score).toEqual(200);
  });
});
