import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchTTShop = (data) => {
    return {
        type: 'TRANSACTION_SHOPPING',
        data
    };
};

const _fetchTTShop_V = (TTOn) => {
    return {
        type: 'TRANSACTION_SHOPPING_SUCCESS',
        data: TTOn
    };
};

const _fetchTTShop_X = (message) => {
    return {
        type: 'TRANSACTION_SHOPPING_FAILED',
        data: message
    };
};

onst _resetFetchTransactionOffline = () => {
    return {
        type: 'RESET_FETCH_TRANSACTION_SHOPPING_STATE'
    };
};

export function* o_fetchTTShop(data) {
    yield takeEvery('TRANSACTION_SHOPPING', k_fetchTTShop);
};

function* k_fetchTTShop(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/transaction/shopping/${form.data.id}/${form.data.page}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchTTShop_V(response.body))
    }catch (error) {
        yield put(_fetchTTShop_X('Error when loading data!'))
    };
}
