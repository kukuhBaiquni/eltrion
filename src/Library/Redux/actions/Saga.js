import { all } from 'redux-saga/effects';
import { o_fetchProducts } from './_f_FetchProducts';
import { o_fetchMember } from './_f_FetchListMember';

import { o_fetchTTOn } from './_f_FetchTransactionTypeOnline';
import { o_fetchTTOff } from './_f_FetchTransactionTypeOffline';
import { o_fetchTTSU } from './_f_FetchTransactionTypeSelfUsage';
import { o_fetchTTShop } from './_f_FetchTransactionTypeShopping';

import { o_editProduct } from './_f_EditProduct';
import { o_addProduct } from './_f_AddProduct';
import { o_editUserInformation } from './_f_EditUserInformation';

import { o_fetchProvinces } from './_f_FetchProvinces';
import { o_fetchCities } from './_f_FetchCities';
import { o_fetchDistricts } from './_f_FetchDistricts';
import { o_fetchVillages } from './_f_FetchVillages';

export default function* rootSaga() {
    yield all([
        o_fetchProducts(),
        o_fetchMember(),

        o_fetchTTOn(),
        o_fetchTTOff(),
        o_fetchTTSU(),
        o_fetchTTShop(),

        o_editProduct(),
        o_addProduct(),
        o_editUserInformation(),

        o_fetchProvinces(),
        o_fetchCities(),
        o_fetchDistricts(),
        o_fetchVillages()
    ]);
};
