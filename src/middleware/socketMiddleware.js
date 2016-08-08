import socketIoClient from 'socket.io-client';
import bindSocketClientListeners from '../socket/bindSocketClientListeners';
import * as actionTypes from '../constants/actionTypes';


let socketConnection;

function isSocketEmitter(actionType) {
  const chunks = actionType.split('|');
  const chunkCount = chunks.length;

  return chunkCount > 0 && chunks[0] === 'SOCKET_EMIT';
}

function getSocketEmitterName(actionType) {
  return actionType.split('|')[1].toLowerCase();
}


export default function socketMiddleware(store) {
  return next => action => {
    if (action.type === actionTypes.CONNECT_TO_SERVER) {
      socketConnection = socketIoClient();

      bindSocketClientListeners({
        io: socketConnection,
        store
      });
    } else if (socketConnection && isSocketEmitter(action.type)) {
      const eventName = getSocketEmitterName(action.type);

      socketConnection.emit(eventName, action.payload);
    }


    return next(action);
  };
}
