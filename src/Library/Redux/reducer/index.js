import { combineReducers } from 'redux';
import products from './Products';
import member from './Member';
import transaction from './Transaction';
import territorial from './Territorial';

const rootReducer = combineReducers({
  products, member, transaction, territorial
});

export default rootReducer;
