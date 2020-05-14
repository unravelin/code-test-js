import { combineReducers } from 'redux';
import fourSquareReducers from './fourSquareReducers';

export default combineReducers({
  fourSquare: fourSquareReducers,
});
