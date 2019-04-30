import { all } from 'redux-saga/effects';
import { o_fetchProducts } from './_f_FetchProducts';
import { o_fetchMember } from './_f_FetchListMember';
import { o_fetchTTOn } from './_f_FetchTransactionTypeOnline';
import { o_fetchTTOff } from './_f_FetchTransactionTypeOffline';
import { o_fetchTTSU } from './_f_FetchTransactionTypeSelfUsage';
import { o_fetchTTShop } from './_f_FetchTransactionTypeShopping';
import { o_editProduct } from './_f_EditProduct';
import { o_addProduct } from './_f_AddProduct';

export default function* rootSaga() {
  yield all([
    o_fetchProducts(),
    o_fetchMember(),
    o_fetchTTOn(),
    o_fetchTTOff(),
    o_fetchTTSU(),
    o_fetchTTShop(),
    o_editProduct(),
    o_addProduct()
  ]);
};
