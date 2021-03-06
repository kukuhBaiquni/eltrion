import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _stockUpdate = (data) => {
    return {
        type: 'STOCK_UPDATE',
        data
    }
};

const _stockUpdate_V = (data) => {
    return {
        type: 'STOCK_UPDATE_SUCCESS',
        data
    }
};

const _stockUpdate_X = () => {
    return {
        type: 'STOCK_UPDATE_FAILED'
    }
};

export const _resetStockUpdate = () => {
    return {
        type: 'RESET_STOCK_UPDATE_STATE'
    }
};

export function* o_stockUpdate(data) {
    yield takeEvery('STOCK_UPDATE', k_stockUpdate);
};

function* k_stockUpdate(form) {
    try{
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}admin/stock/update/admin-web`)
            .set('Authorization', `${form.data.token}`)
            .send({value: form.data.value})
            .send({id: form.data.id})
            .send({email: form.data.email})
            .then((res) => {
                return res;
            })
        });
        yield put(_stockUpdate_V(response.body.data));
    }catch (error) {
        yield put(_stockUpdate_X('Error when loading data!'));
    };
};
