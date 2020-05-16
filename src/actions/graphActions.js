import api from './api';

export const TYPES = {
  ADD_LINK: 'ADD_LINK',
  ADD_NODE: 'ADD_NODE',
  GET_SIMILAR_VENUES_ERROR: 'GET_SIMILAR_VENUES_ERROR',
  GET_SIMILAR_VENUES_SUCCESS: 'GET_SIMILAR_VENUES_SUCCESS',
  MOUNT_GRAPH: 'MOUNT_GRAPH',
  SET_FOUND_SIMILAR_VENUES: 'SET_FOUND_SIMILAR_VENUES',
  SET_GRAPH_INITIALIZED: 'SET_GRAPH_INITIALIZED',
  STOP_SIMULATION: 'STOP_SIMULATION',
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
  });
};

export const stopSimulation = () => ({
  type: TYPES.STOP_SIMULATION,
});

export const getSimilarVenuesError = (error) => ({
  type: TYPES.GET_SIMILAR_VENUES_ERROR,
  error,
});

export const setFoundSimilarVenuesFor = (venueId) => ({
  type: TYPES.SET_FOUND_SIMILAR_VENUES,
  venueId,
})

export const waitFor = async(duration) => new Promise(resolve => setTimeout(resolve, duration));

export const getSimilarVenuesFor = (venueId) => async (dispatch, getState) => {
  try {
    const {
      fourSquare: { clientId, clientSecret },
      graphState: { isSimulationOn },
    } = getState();
    const response = await api.getSimilarVenues(clientId, clientSecret, venueId)
    const responseJson = await response.json();
    dispatch(setFoundSimilarVenuesFor(venueId));
    dispatch(getSimilarVenuesSuccess(responseJson, venueId));

    await waitFor(1000);
    if (isSimulationOn) {
      dispatch(findNextSimilarVenue());
    }
  } catch(error) {
    return dispatch(getSimilarVenuesError(error))
  }
}

export const findNextSimilarVenue = () => (dispatch, getState) => {
    const { graphState: { nodes } } = getState();

    for(let [nodeKey, nodeValue] of nodes) {
      if (!nodeValue.foundSimilar) {
        dispatch(getSimilarVenuesFor(nodeKey));
        return;
      }
    }
};

export const setGraphInitialized = () => async (dispatch, getState) => {
  dispatch(mountGraph());
  const { fourSquare: { selectedVenue }} = getState();

  dispatch(addNode(selectedVenue));
  dispatch(findNextSimilarVenue());
};
