import * as environmentActions from '../actions/environmentActions';
import * as gameActions from '../actions/gameActions';


export default function (dependencies) {
  if (!dependencies.io) {
    throw new Error('The socket connection must be provided.');
  }

  if (!dependencies.store) {
    throw new Error('The Redux store must be provided.');
  }

  const io = dependencies.io;
  const store = dependencies.store;


  io.on('connect', () => {
    return store.dispatch(environmentActions.completeConnectionToServer());
  });

  io.on('confirm_game_start', (gameData) => {
    store.dispatch(gameActions.setPlayerId(gameData.playerId));

    return store.dispatch(environmentActions.loadAssets(gameData.sounds));
  });

  io.on('question', (question) => {
    console.log(question);
    return store.dispatch(gameActions.completeQuestionRequest(question));
  });

}
