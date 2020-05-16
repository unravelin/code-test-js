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

export const getSimilarVenuesSuccess = (response, venueId) => async(dispatch) => {
  response.response.similarVenues.items.forEach(item => {
    const link = {
      source: venueId,
      target: item.id,
    };
    dispatch(addNode(item));
    dispatch(addLink(link));

    // setTimeout(() => {
    //   dispatch(getSimilarVenuesFor(item.id))
    // }, 2500);
  });
};

export const getSimilarVenuesError = (error) => ({
  type: TYPES.GET_SIMILAR_VENUES_ERROR,
  error,
});

export const getSimilarVenuesFor = (venueId) => async (dispatch, getState) => {
  try {
    const { fourSquare: { clientId, clientSecret } } = getState();
    const response = await api.getSimilarVenues(clientId, clientSecret, venueId)
    const responseJson = await response.json();
    return dispatch(getSimilarVenuesSuccess(responseJson, venueId));
  } catch(error) {
    return dispatch(getSimilarVenuesError(error))
  }
}

export const setGraphInitialized = (selectedVenueId) => async (dispatch, getState) => {
  dispatch(mountGraph());
  const { fourSquare: { selectedVenue }} = getState();

  const firstNode = selectedVenue;
  dispatch(addNode(firstNode));

  setTimeout(() => {
    dispatch(getSimilarVenuesFor(selectedVenueId));
  }, 1000);
};
