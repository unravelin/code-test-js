import api from './api';

export const TYPES = {
  ADD_LINK: 'ADD_LINK',
  ADD_NODE: 'ADD_NODE',
  GET_SIMILAR_VENUES_ERROR: 'GET_SIMILAR_VENUES_ERROR',
  GET_SIMILAR_VENUES_SUCCESS: 'GET_SIMILAR_VENUES_SUCCESS',
  MOUNT_GRAPH: 'MOUNT_GRAPH',
  SET_FOUND_SIMILAR_VENUES: 'SET_FOUND_SIMILAR_VENUES',
  SET_GRAPH_INITIALIZED: 'SET_GRAPH_INITIALIZED',
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

export const setFoundSimilarVenuesFor = (venueId) => ({
  type: TYPES.SET_FOUND_SIMILAR_VENUES,
  venueId,
})

export const getSimilarVenuesFor = (venueId) => async (dispatch, getState) => {
  try {
    const { fourSquare: { clientId, clientSecret } } = getState();
    const response = await api.getSimilarVenues(clientId, clientSecret, venueId)
    const responseJson = await response.json();
    dispatch(setFoundSimilarVenuesFor(venueId));
    return dispatch(getSimilarVenuesSuccess(responseJson, venueId));
  } catch(error) {
    return dispatch(getSimilarVenuesError(error))
  }
}

export const findNextSimilarVenue = () => (dispatch, getState) => {
  const interval = setInterval(() => {
    const { graphState: { nodes } } = getState();
    for(let [nodeKey, nodeValue] of nodes) {
      if (!nodeValue.foundSimilar) {
        dispatch(getSimilarVenuesFor(nodeKey));
        return;
      }
    }

    clearInterval(interval);
  }, 1000);
};

export const setGraphInitialized = () => async (dispatch, getState) => {
  dispatch(mountGraph());
  const { fourSquare: { selectedVenue }} = getState();

  dispatch(addNode(selectedVenue));
  dispatch(findNextSimilarVenue());
};
