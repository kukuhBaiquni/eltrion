import { combineReducers } from 'redux';
import products from './Products';
import member from './Member';

const rootReducer = combineReducers({
  products, member
});

export default rootReducer;
