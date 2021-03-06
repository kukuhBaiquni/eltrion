import { all } from 'redux-saga/effects';
import { o_fetchProducts } from './_f_FetchProducts';

import { o_fetchMember } from './_f_FetchListMember';
import { o_fetchNonMember } from './_f_FetchListNonMember';
import { o_fetchAdministrator } from './_f_FetchListAdministrator';

import { o_fetchTTOn } from './_f_FetchTransactionTypeOnline';
import { o_fetchTTOff } from './_f_FetchTransactionTypeOffline';
import { o_fetchTTSU } from './_f_FetchTransactionTypeSelfUsage';
import { o_fetchTTShop } from './_f_FetchTransactionTypeShopping';

import { o_editProduct } from './_f_EditProduct';
import { o_addProduct } from './_f_AddProduct';

import { o_editMemberInformation } from './_f_EditMemberInformation';
import { o_editNonMemberInformation } from './_f_EditNonMemberInformation';
import { o_editAdministratorInformation } from './_f_EditAdministratorInformation';

import { o_fetchProvinces } from './_f_FetchProvinces';
import { o_fetchCities } from './_f_FetchCities';
import { o_fetchDistricts } from './_f_FetchDistricts';
import { o_fetchVillages } from './_f_FetchVillages';

import { o_filterNonMember } from './_f_FilterNonMember';
import { o_filterMember } from './_f_FilterMember';
import { o_filterAdministrator } from './_f_FilterAdministrator';

import { o_fetchAllOnline } from './_f_FetchAllTransactionTypeOnline';
import { o_fetchAllOffline } from './_f_FetchAllTransactionTypeOffline';
import { o_fetchAllSelfUsage } from './_f_FetchAllTransactionTypeSelfUsage';
import { o_fetchAllShopping } from './_f_FetchAllTransactionTypeShopping';

import { o_filterTransactionOffline } from './_f_FilterTransactionOffline';
import { o_filterTransactionOnline } from './_f_FilterTransactionOnline';
import { o_filterTransactionSelfUsage } from './_f_FilterTransactionSelfUsage';
import { o_filterTransactionShopping } from './_f_FilterTransactionShopping';

import { o_stockUpdate } from './_f_StockUpdate';
import { o_login } from './_f_Login';
import { o_changeStatusTracking } from './_f_ChangeStatusTracking';

import { o_adminCheck } from './_f_AdminCheck';
import { o_adminData } from './_f_AdminData';

export default function* rootSaga() {
    yield all([
        o_fetchProducts(),

        o_fetchMember(),
        o_fetchNonMember(),
        o_fetchAdministrator(),

        o_fetchTTOn(),
        o_fetchTTOff(),
        o_fetchTTSU(),
        o_fetchTTShop(),

        o_editProduct(),
        o_addProduct(),

        o_editMemberInformation(),
        o_editNonMemberInformation(),
        o_editAdministratorInformation(),

        o_fetchProvinces(),
        o_fetchCities(),
        o_fetchDistricts(),
        o_fetchVillages(),

        o_filterNonMember(),
        o_filterMember(),
        o_filterAdministrator(),

        o_fetchAllOnline(),
        o_fetchAllOffline(),
        o_fetchAllSelfUsage(),
        o_fetchAllShopping(),

        o_filterTransactionOffline(),
        o_filterTransactionOnline(),
        o_filterTransactionShopping(),
        o_filterTransactionSelfUsage(),

        o_stockUpdate(),
        o_login(),
        o_changeStatusTracking(),

        o_adminCheck(),
        o_adminData()
    ]);
};
