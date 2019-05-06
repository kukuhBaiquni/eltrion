import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _filterTransactionShopping = (data) => {
    return {
        type: 'FILTER_TRANSACTION_SHOPPING',
        data
    }
};

const _filterTransactionShopping_V = (data) => {
    return {
        type: 'FILTER_TRANSACTION_SHOPPING_SUCCESS',
        data
    }
};

const _filterTransactionShopping_X = () => {
    return {
        type: 'FILTER_TRANSACTION_SHOPPING_FAILED'
    }
};

export const _resetFilterTransactionShopping = () => {
    return {
        type: 'RESET_FILTER_TRANSACTION_SHOPPING_STATE'
    }
};

export function* o_filterTransactionShopping(data) {
    yield takeEvery('FILTER_TRANSACTION_SHOPPING', k_filterTransactionShopping);
};

function* k_filterTransactionShopping(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/filter-transaction/shopping/${form.data.query}/${form.data.type}/${form.data.index}`)
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_filterTransactionShopping_V(response.body));
    }catch (error) {
        yield put(_filterTransactionShopping_X('Error when loading data!'));
    };
};
