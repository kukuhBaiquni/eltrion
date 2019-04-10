import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _submitFormEditProduct = (data, token) => {
    return {
        type: 'SUBMIT_FORM_EDIT_PRODUCT',
        data,
        token
    }
};

const _submitFormEditProduct_V = (message) => {
    return {
        type: 'SUBMIT_FORM_EDIT_PRODUCT_SUCCESS',
        data: message
    };
};

const _submitFormEditProduct_X = (message) => {
    return {
        type: 'SUBMIT_FORM_EDIT_PRODUCT_FAILED',
        data: message
    };
};

export function* o_submitFormEditProduct(data, token) {
    yield takeEvery('SUBMIT_FORM_EDIT_PRODUCT', k_submitFormEditProduct);
};

function* k_submitFormEditProduct(form) {
    try{
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}admin/crud-product/edit/${form.data.idProduct}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.token}`)
            .send({data: form.data})
            .then((res) => {
                return res;
            })
        });
        yield put(_submitFormEditProduct_V(response.body))
    }catch (error) {
        yield put(_submitFormEditProduct_X('Error when loading data!'))
    };
};
