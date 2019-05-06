import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _filterTransactionSelfUsage = (data) => {
    return {
        type: 'FILTER_TRANSACTION_SELFUSAGE',
        data
    }
};

const _filterTransactionSelfUsage_V = (data) => {
    return {
        type: 'FILTER_TRANSACTION_SELFUSAGE_SUCCESS',
        data
    }
};

const _filterTransactionSelfUsage_X = () => {
    return {
        type: 'FILTER_TRANSACTION_SELFUSAGE_FAILED'
    }
};

export const _resetFilterTransactionSelfUsage = () => {
    return {
        type: 'RESET_FILTER_TRANSACTION_SELFUSAGE_STATE'
    }
};

export function* o_filterTransactionSelfUsage(data) {
    yield takeEvery('FILTER_TRANSACTION_SELFUSAGE', k_filterTransactionSelfUsage);
};

function* k_filterTransactionSelfUsage(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/filter-transaction/self-usage/${form.data.query}/${form.data.type}/${form.data.index}`)
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_filterTransactionSelfUsage_V(response.body));
    }catch (error) {
        yield put(_filterTransactionSelfUsage_X('Error when loading data!'));
    };
};
