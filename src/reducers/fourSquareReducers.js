import { TYPES } from '../actions/fourSquareActions';

export const getSuggestedVenuesSuccess = (state, suggestedVenues) => ({
  ...state,
  suggestedVenues,
});

export const getSuggestedVenuesError = (state, error) => ({
  ...state,
  error,
});

export const setClientId = (state, clientId) => ({
  ...state,
  clientId
});

export const setClientSecret = (state, clientSecret) => ({
  ...state,
  clientSecret,
});

const defaultState = {
  clientId: '',
  clientSecret: '',
  suggestedVenues: [],
};

export default (state, action) => {
  switch(action.type) {
    case TYPES.GET_SUGGESTED_VENUES_SUCCESS: return getSuggestedVenuesSuccess(state, action.response)
    case TYPES.GET_SUGGESTED_VENUES_ERROR: return getSuggestedVenuesError(state, action.response)
    case TYPES.SET_CLIENT_ID: return setClientId(state, action.clientId)
    case TYPES.SET_CLIENT_SECRET: return setClientSecret(state, action.clientSecret)
    default: return defaultState;
  }
};

