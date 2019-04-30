import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchTTOff = (data) => {
    return {
        type: 'TRANSACTION_OFFLINE',
        data
    };
};

const _fetchTTOff_V = (TTOn) => {
    return {
        type: 'TRANSACTION_OFFLINE_SUCCESS',
        data: TTOn
    };
};

const _fetchTTOff_X = (message) => {
    return {
        type: 'TRANSACTION_OFFLINE_FAILED',
        data: message
    };
};

const _resetFetchTransactionOffline = () => {
    return {
        type: 'RESET_FETCH_TRANSACTION_OFFLINE_STATE'
    };
};

export function* o_fetchTTOff(data) {
    yield takeEvery('TRANSACTION_OFFLINE', k_fetchTTOff);
};

function* k_fetchTTOff(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/transaction/offline/${form.data.id}/${form.data.page}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchTTOff_V(response.body))
    }catch (error) {
        yield put(_fetchTTOff_X('Error when loading data!'))
    };
}
