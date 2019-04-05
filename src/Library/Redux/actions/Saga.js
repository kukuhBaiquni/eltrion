import { all } from 'redux-saga/effects';
import { o_fetchProducts } from './_f_FetchProducts';
import { o_fetchMember } from './_f_FetchListMember';

export default function* rootSaga() {
  yield all([
    o_fetchProducts(),
    o_fetchMember()
  ]);
};
