import * as environmentActions from '../actions/environmentActions';
import * as gameActions from '../actions/gameActions';
import * as ratingActions from '../actions/ratingActions';


export default function (dependencies) {
  if (!dependencies.io) {
    throw new Error('The socket connection must be provided.');
  }

  if (!dependencies.store) {
    throw new Error('The Redux store must be provided.');
  }

  const io = dependencies.io;
  const store = dependencies.store;


  io.on('connect', () => store.dispatch(environmentActions.completeConnectionToServer()));

  io.on('confirm_game_start', (gameData) => {
    store.dispatch(gameActions.setPlayerId(gameData.playerId));
    store.dispatch(environmentActions.loadAssets(gameData.sounds));
  });

  io.on('question', question => store.dispatch(gameActions.completeQuestionRequest(question)));

  io.on('confirm_incorrect_answer', () => store.dispatch(gameActions.confirmIncorrectAnswer()));

  io.on('confirm_correct_answer', (score) => {
    store.dispatch(gameActions.confirmCorrectAnswer());
    store.dispatch(gameActions.updatePlayerScore(score));
    store.dispatch(gameActions.requestQuestion());
  });

  io.on('rating_of_current_players', (players) => {
    store.dispatch(ratingActions.updateRating(players));
  });
  io.on('rating', rating => store.dispatch(ratingActions.setRating(rating)));

  io.on('game_over', () => store.dispatch(gameActions.overGame()));
}
