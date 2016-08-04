import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import socket from '../middleware/socketMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState,
                     applyMiddleware(socket, reduxImmutableStateInvariant()));
}