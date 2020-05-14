import { combineReducers } from 'redux';
import fourSquareReducers from './fourSquareReducers';
import graphReducers from './graphReducers';

export default combineReducers({
  fourSquare: fourSquareReducers,
  graphState: graphReducers,
});
