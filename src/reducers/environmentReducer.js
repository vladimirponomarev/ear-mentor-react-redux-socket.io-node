import * as actionTypes from '../constants/actionTypes';


const initialState = {
  isInAssetLoading: false,
  isInGame: false,
  hasPlayerLost: false,
  assets: []
};

export default function environmentReducer(state = initialState, action) {
  switch (action.type) {

    case actionTypes.LOAD_ASSETS:
      return Object.assign({}, state,
        { isInAssetLoading: true, assets: action.assets });

    case actionTypes.COMPLETE_ASSET_LOADING:
      return Object.assign({}, state,
        { isInAssetLoading: false, isInGame: true });

    case actionTypes.START_GAME:
      return Object.assign({}, state,
        { hasPlayerLost: false });

    case actionTypes.LOSE_GAME:
      return Object.assign({}, state,
        { hasPlayerLost: true, isInGame: false });

    case actionTypes.QUIT_GAME:
      return Object.assign({}, state,
        { isInGame: false });

    default:
      return state;
  }
}
