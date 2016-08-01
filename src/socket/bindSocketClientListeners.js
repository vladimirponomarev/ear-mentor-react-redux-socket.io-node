import * as environmentActions from '../actions/environmentActions';


export default function (dependencies) {

  if (!dependencies.socket) {
    throw new Error('The socket connection must be provided.');
  }

  if (!dependencies.store) {
    throw new Error('The Redux store must be provided.');
  }

  const socket = dependencies.socket;
  const store = dependencies.store;


  socket.on('connect', () => {
    return store.dispatch(environmentActions.completeConnectionToServer());
  });

}
