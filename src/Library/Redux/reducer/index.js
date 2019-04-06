import { combineReducers } from 'redux';
import products from './Products';
import member from './Member';
import transaction from './Transaction';

const rootReducer = combineReducers({
  products, member, transaction
});

export default rootReducer;
