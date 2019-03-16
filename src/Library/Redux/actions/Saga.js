import { all } from 'redux-saga/effects';
import { watcherAccountVerification } from './Account_Verification';
import { watcherAddtoCart } from './Add_To_Cart';
import { o_fetchProducts } from './_f_FetchProducts';

export default function* rootSaga() {
  yield all([
    watcherAddtoCart(),
    watcherAccountVerification(),
    o_fetchProducts()
  ]);
};
