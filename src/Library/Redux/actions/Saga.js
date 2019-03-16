import { all } from 'redux-saga/effects';
import { watcherAccountVerification } from './Account_Verification';
import { watcherAddtoCart } from './Add_To_Cart';

export default function* rootSaga() {
  yield all([
    watcherAddtoCart(),
    watcherAccountVerification()
  ]);
};
