import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import socket from '../middleware/socketMiddleware';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(socket));
}
