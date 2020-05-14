import { TYPES } from '../actions/graphActions';

export const setGraphInitialized = (state) => ({
  ...state,
  graphInitialized: true,
})

const defaultState = {
  graphInitialized: false,
};

export default (state, action) => {
  switch(action.type) {
    case TYPES.SET_GRAPH_INITIALIZED: return setGraphInitialized(state)
    default: return state || defaultState;
  }
};

