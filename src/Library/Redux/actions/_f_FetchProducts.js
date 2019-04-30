import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchProducts = () => {
    return {
        type: 'FETCH_PRODUCTS'
    };
};

const _fetchProducts_X = (message) => {
    return {
        type: 'FETCH_PRODUCTS_FAILED',
        data: message
    };
};

const _fetchProducts_V = (products) => {
    return {
        type: 'FETCH_PRODUCTS_SUCCESS',
        data: products
    };
};

const _resetFetchProduct = () => {
    return {
        type: 'RESET_FETCH_PRODUCT_STATE'
    };
};

export function* o_fetchProducts() {
    yield takeEvery('FETCH_PRODUCTS', k_fetchProducts);
};

function* k_fetchProducts() {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}android/get_all_products`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchProducts_V(response.body.data))
    }catch (error) {
        yield put(_fetchProducts_X('Error when loading data!'))
    };
};
