import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchTTOn = (data) => {
    return {
        type: 'TRANSACTION_ONLINE',
        data
    };
};

const _fetchTTOn_V = (TTOn) => {
    return {
        type: 'TRANSACTION_ONLINE_SUCCESS',
        data: TTOn
    };
};

const _fetchTTOn_X = (message) => {
    return {
        type: 'TRANSACTION_ONLINE_FAILED',
        data: message
    };
};

const _resetFetchTransactionOffline = () => {
    return {
        type: 'RESET_FETCH_TRANSACTION_ONLINE_STATE'
    };
};

export function* o_fetchTTOn(data) {
    yield takeEvery('TRANSACTION_ONLINE', k_fetchTTOn);
};

function* k_fetchTTOn(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/transaction/online/${form.data.id}/${form.data.page}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchTTOn_V(response.body))
    }catch (error) {
        yield put(_fetchTTOn_X('Error when loading data!'))
    };
}
