import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchAllShopping = (data) => {
    return {
        type: 'FETCH_ALL_SHOPPING',
        data
    }
};

const _fetchAllShopping_V = (data) => {
    return {
        type: 'FETCH_ALL_SHOPPING_SUCCESS',
        data
    }
};

const _fetchAllShopping_X = () => {
    return {
        type: 'FETCH_ALL_SHOPPING_FAILED'
    }
};

export const _resetFetchAllShopping = () => {
    return {
        type: 'RESET_FETCH_ALL_SHOPPING_STATE'
    }
};

export function* o_fetchAllShopping(data) {
    yield takeEvery('FETCH_ALL_SHOPPING', k_fetchAllShopping);
};

function* k_fetchAllShopping(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/fetch-all/transaction/shopping-member/${form.data.index}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchAllShopping_V(response.body))
    }catch (error) {
        yield put(_fetchAllShopping_X('Error when loading data!'))
    };
};
