import * as actionTypes from '../constants/actionTypes';


export function connectToServer() {
  return {
    type: actionTypes.CONNECT_TO_SERVER
  };
}

export function startGame(settings) {
  return {
    type: actionTypes.START_GAME,
    payload: settings
  };
}

export function completeConnectionToServer() {
  return {
    type: actionTypes.COMPLETE_CONNECTION_TO_SERVER
  };
}

export function loadAssets(assets) {
  return {
    type: actionTypes.LOAD_ASSETS,
    assets
  };
}

export function completeAssetLoading() {
  return {
    type: actionTypes.COMPLETE_ASSET_LOADING
  };
}
