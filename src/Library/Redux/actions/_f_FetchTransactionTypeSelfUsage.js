import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchTTSU = (data) => {
    return {
        type: 'TRANSACTION_SELFUSAGE',
        data
    };
};

const _fetchTTSU_V = (TTOn) => {
    return {
        type: 'TRANSACTION_SELFUSAGE_SUCCESS',
        data: TTOn
    };
};

const _fetchTTSU_X = (message) => {
    return {
        type: 'TRANSACTION_SELFUSAGE_FAILED',
        data: message
    };
};

const _resetFetchTransactionOffline = () => {
    return {
        type: 'RESET_FETCH_TRANSACTION_SELFUSAGE_STATE'
    };
};

export function* o_fetchTTSU(data) {
    yield takeEvery('TRANSACTION_SELFUSAGE', k_fetchTTSU);
};

function* k_fetchTTSU(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/transaction/self-usage/${form.data.id}/${form.data.page}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchTTSU_V(response.body))
    }catch (error) {
        yield put(_fetchTTSU_X('Error when loading data!'))
    };
}
