import api from './api';

export const TYPES = {
  SET_GRAPH_INITIALIZED: 'SET_GRAPH_INITIALIZED',
  MOUNT_GRAPH: 'MOUNT_GRAPH',
  GET_SIMILAR_VENUES_SUCCESS: 'GET_SIMILAR_VENUES_SUCCESS',
  GET_SIMILAR_VENUES_ERROR: 'GET_SIMILAR_VENUES_ERROR',
  ADD_NODE: 'ADD_NODE',
  ADD_LINK: 'ADD_LINK',
}

export const mountGraph = () => ({
  type: 'MOUNT_GRAPH'
});

export const addNode = (node) => ({
  type: 'ADD_NODE',
  node,
});

export const addLink = (link) => ({
  type: 'ADD_LINK',
  link,
});

export const getSimilarVenuesSuccess = (response, venueId) => async(dispatch, getState) => {
  response.response.similarVenues.items.forEach(item => {
    const link = {
      source: venueId,
      target: item.id,
    };
    dispatch(addNode(item));
    dispatch(addLink(link));

  });
};

export const getSimilarVenuesError = (error) => ({
  type: TYPES.GET_SIMILAR_VENUES_ERROR,
  error,
});

export const setGraphInitialized = ()  => async (dispatch, getState) => {
  dispatch(mountGraph());

  try {
    const { fourSquare: { clientId, clientSecret, selectedVenueId } } = getState();
    const response = await api.getSimilarVenues(clientId, clientSecret, selectedVenueId)
    const responseJson = await response.json();
    return dispatch(getSimilarVenuesSuccess(responseJson, selectedVenueId));
  } catch(error) {
    return dispatch(getSimilarVenuesError(error))
  }
};
