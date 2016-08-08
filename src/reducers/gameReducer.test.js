/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import gameReducer from './gameReducer';
import * as gameActions from '../actions/gameActions';


describe('Game Reducer', () => {
  const initialState = {
    playerId: null,
    question: {},
    answer: '',
    score: 0,
    rating: []
  };


  it("should set a player's id", () => {
    const playerId = 1000;
    const action = gameActions.setPlayerId(playerId);

    const finalState = gameReducer(initialState, action);

    expect(finalState.playerId).toEqual(playerId);
  });

  it("should update a player's score", () => {
    const score = 300;
    const action = gameActions.updatePlayerScore(score);

    const finalState = gameReducer(initialState, action);

    expect(finalState.score).toEqual(score);
  });

  it("should update a rating list", () => {
    const rating = [
      { id: 1, name: 'Jane Doe', country: 'US', score: 200 },
      { id: 2, name: 'John Doe', country: 'RU', score: 300 }
    ];
    const action = gameActions.updateRating(rating);

    const finalState = gameReducer(initialState, action);

    expect(finalState.rating).toEqual(rating);
  });

  it("should set a question", () => {
    const question = {
      number: 1,
      firstNote: 'A',
      secondNote: 'C'
    };
    const action = gameActions.completeQuestionRequest(question);

    const finalState = gameReducer(initialState, action);

    expect(finalState.question).toEqual(question);
  });
});
