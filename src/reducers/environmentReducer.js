import * as actionTypes from '../constants/actionTypes';


const initialState = {
  isInGame: false,
  isInAssetLoading: false,
  assets: [],
  requestInProgressCount: 0
};

function getNewRequestInProgressCount(actionType, currentCount) {
  const chunks = actionType.split('|');
  const chunkCount = chunks.length;

  let count = currentCount;

  if (chunkCount > 0 && chunks[chunkCount - 1] === 'AWAIT') {
    count = currentCount + 1;
  } else if (chunkCount > 0 && chunks[chunkCount - 1] === 'AWAIT_DONE') {
    count = currentCount - 1;
  }

  return count;
}

export default function environmentReducer(state = initialState, action) {
  const updatedState = {};
  const newRequestInProgressCount = getNewRequestInProgressCount(action.type,
    state.requestInProgressCount);
  let hasStateChanged = false;

  if (newRequestInProgressCount !== state.requestInProgressCount) {
    updatedState.requestInProgressCount = newRequestInProgressCount;
    hasStateChanged = true;
  }

  if (action.type === actionTypes.LOAD_ASSETS) {
    updatedState.isInAssetLoading = true;
    updatedState.assets = action.assets;

    hasStateChanged = true;
  }

  if (action.type === actionTypes.COMPLETE_ASSET_LOADING) {
    updatedState.isInAssetLoading = false;
    updatedState.isInGame = true;
    updatedState.hasPlayerLost = false;

    hasStateChanged = true;
  }

  if (hasStateChanged) {
    return Object.assign({}, state, updatedState);
  }

  return state;
}
