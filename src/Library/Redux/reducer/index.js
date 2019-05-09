import { combineReducers } from 'redux';
import products from './Products';
import member from './Member';
import nonMember from './NonMember';
import administrator from './Administrator'
import transaction from './Transaction';
import territorial from './Territorial';
import login from './Login';

const rootReducer = combineReducers({
  products, member, nonMember, administrator, transaction, territorial, login
});

export default rootReducer;
