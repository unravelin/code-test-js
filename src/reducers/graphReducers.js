import { TYPES } from '../actions/graphActions';

export const mountDirectedGraph = (state) => ({
  ...state,
  graphMounted: true,
})

export const addNode = (state, node) => {
  const newState = {...state};

  const newNodes = new Map(state.nodes);
  newNodes.set(node.id, node);

  newState.nodes = newNodes;

  return newState;
};

export const addLink = (state, link) => {
  const newState = {...state};

  const newLinks = new Set(state.links);
  newLinks.add(link);

  newState.links = newLinks;

  return newState;
};

const defaultState = {
  graphMounted: false,
  nodes: new Map(),
  links: new Set(),
};

export default (state, action) => {
  switch(action.type) {
    case TYPES.MOUNT_GRAPH: return mountDirectedGraph(state)
    case TYPES.ADD_NODE: return addNode(state, action.node)
    case TYPES.ADD_LINK: return addLink(state, action.link)
    default: return state || defaultState;
  }
};

