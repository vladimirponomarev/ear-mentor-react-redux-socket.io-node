/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import gameReducer from './gameReducer';
import * as gameActions from '../actions/gameActions';
import * as musicalIntervals from '../constants/musicalIntervals';


describe('Game Reducer', () => {
  const initialState = {
    playerId: null,
    question: {},
    givenAnswer: '',
    incorrectAnswers: [],
    score: 0,
    rating: [],
    hasPlayerLost: false
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

  it('should add an incorrect answer', () => {
    const answer = -musicalIntervals.MINOR_THIRD;

    const firstAction = gameActions.sendAnswer(answer);
    const updatedState = gameReducer(initialState, firstAction);
    const secondAction = gameActions.confirmIncorrectAnswer();
    const finalState = gameReducer(updatedState, secondAction);

    expect(finalState.incorrectAnswers).toInclude(answer);
  });

  it('should reset incorrect answers when a new question received', () => {
    initialState.incorrectAnswers = [-musicalIntervals.MINOR_THIRD, -musicalIntervals.MAJOR_SECOND];
    const question = {
      number: 1,
      firstNote: 'A',
      secondNote: 'C'
    };
    const action = gameActions.completeQuestionRequest(question);

    const finalState = gameReducer(initialState, action);

    expect(finalState.incorrectAnswers.length).toEqual(0);
  });

  it('should set a given answer', () => {
    const answer = -musicalIntervals.MINOR_THIRD;
    const action = gameActions.sendAnswer(answer);

    const finalState = gameReducer(initialState, action);

    expect(finalState.givenAnswer).toEqual(answer);
  });

  it('should over a game', () => {
    const action = gameActions.overGame(1000);

    const finalState = gameReducer(initialState, action);

    expect(finalState.hasPlayerLost).toBeTruthy();
  });
});
