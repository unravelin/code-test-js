import api from './api';
import { TYPES as GRAPH_TYPES } from './graphActions';

export const TYPES = {
  GET_SUGGESTED_VENUES_ERROR: 'GET_SUGGESTED_VENUES_ERROR',
  GET_SUGGESTED_VENUES_SUCCESS: 'GET_SUGGESTED_VENUES_SUCCESS',
  GET_SUGGESTED_VENUES: 'GET_SUGGESTED_VENUES',
  SET_CLIENT_ID: 'SET_CLIENT_ID',
  SET_CLIENT_SECRET: 'SET_CLIENT_SECRET',
  SELECT_VENUE: 'SELECT_VENUE',
}

export const getSuggestedVenuesSuccess = (response) => ({
  type: TYPES.GET_SUGGESTED_VENUES_SUCCESS,
  response,
});

export const getSuggestedVenuesError = (error) => ({
  type: TYPES.GET_SUGGESTED_VENUES_ERROR,
  error,
});

export const setClientId = (clientId) => ({
  type: TYPES.SET_CLIENT_ID,
  clientId,
})

export const setClientSecret = (clientSecret) => ({
  type: TYPES.SET_CLIENT_SECRET,
  clientSecret,
});

export const selectVenue = (venueName) => async(dispatch, getState) => {
  dispatch({
    type: TYPES.SELECT_VENUE,
    venueName,
  });

  const state = getState();

  const selectedVenue = state.fourSquare.suggestedVenues.filter(venue => venue.name === venueName);

  if (selectedVenue?.length) {
    dispatch({
      type: GRAPH_TYPES.ADD_NODE,
      node: selectedVenue[0],
    })
  }
};

export const getSuggestedVenues = (query) => async(dispatch, getState) => {
  try {
    const { fourSquare: { clientId, clientSecret } } = getState();
    dispatch(selectVenue(query));
    const response = await api.getSuggestedVenues(clientId, clientSecret, query);
    const responseJson = await response.json();
    return dispatch(getSuggestedVenuesSuccess(responseJson.response.venues.slice(0, 8)));
  } catch(error) {
    return dispatch(getSuggestedVenuesError(error))
  }
};
