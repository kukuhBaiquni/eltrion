import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _filterTransactionOffline = (data) => {
    return {
        type: 'FILTER_TRANSACTION_OFFLINE',
        data
    }
};

const _filterTransactionOffline_V = (data) => {
    return {
        type: 'FILTER_TRANSACTION_OFFLINE_SUCCESS',
        data
    }
};

const _filterTransactionOffline_X = () => {
    return {
        type: 'FILTER_TRANSACTION_OFFLINE_FAILED'
    }
};

export const _resetFilterTransactionOffline = () => {
    return {
        type: 'RESET_FILTER_TRANSACTION_OFFLINE_STATE'
    }
};

export function* o_filterTransactionOffline(data) {
    yield takeEvery('FILTER_TRANSACTION_OFFLINE', k_filterTransactionOffline);
};

function* k_filterTransactionOffline(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/filter-transaction/offline/${form.data.query}/${form.data.type}/${form.data.index}`)
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_filterTransactionOffline_V(response.body));
    }catch (error) {
        yield put(_filterTransactionOffline_X('Error when loading data!'));
    };
};
