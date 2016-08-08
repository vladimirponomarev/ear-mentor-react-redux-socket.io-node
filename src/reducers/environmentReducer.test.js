/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import environmentReducer from './environmentReducer';
import * as environmentActions from '../actions/environmentActions';


describe('Environment Reducer', () => {
  const initialState = {
    isInGame: false,
    isInAssetLoading: false,
    assets: [],
    requestInProgressCount: 0
  };

  it('should set a loading status and an asset list', () => {
    const assets = [
      '/data/sounds/1.mp3',
      '/data/sounds/2.mp3',
      '/data/sounds/3.mp3'
    ];
    const action = environmentActions.loadAssets(assets);

    const newState = environmentReducer(initialState, action);

    expect(newState.isInAssetLoading).toBeTruthy();
    expect(newState.assets).toEqual(assets);
  });

  it('should set an asset loading as completed and start the game', () => {
    const assets = [
      '/data/sounds/1.mp3',
      '/data/sounds/2.mp3',
      '/data/sounds/3.mp3'
    ];
    const firstAction = environmentActions.loadAssets(assets);
    const updatedState = environmentReducer(initialState, firstAction);
    const secondAction = environmentActions.completeAssetLoading();

    const finalState = environmentReducer(updatedState, secondAction);

    expect(finalState.isInAssetLoading).toBeFalsy();
    expect(finalState.isInGame).toBeTruthy();
    expect(finalState.assets).toEqual(assets);
  });

  it('should increase a request counter', () => {
    const action1 = environmentActions.connectToServer();
    const updatedState = environmentReducer(initialState, action1);
    const action2 = environmentActions.connectToServer();
    const finalState = environmentReducer(updatedState, action2);

    expect(finalState.requestInProgressCount).toEqual(2);
  });
});
