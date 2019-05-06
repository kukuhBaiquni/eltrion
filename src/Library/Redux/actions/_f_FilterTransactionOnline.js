import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _filterTransactionOnline = (data) => {
    return {
        type: 'FILTER_TRANSACTION_ONLINE',
        data
    }
};

const _filterTransactionOnline_V = (data) => {
    return {
        type: 'FILTER_TRANSACTION_ONLINE_SUCCESS',
        data
    }
};

const _filterTransactionOnline_X = () => {
    return {
        type: 'FILTER_TRANSACTION_ONLINE_FAILED'
    }
};

export const _resetFilterTransactionOnline = () => {
    return {
        type: 'RESET_FILTER_TRANSACTION_ONLINE_STATE'
    }
};

export function* o_filterTransactionOnline(data) {
    yield takeEvery('FILTER_TRANSACTION_ONLINE', k_filterTransactionOnline);
};

function* k_filterTransactionOnline(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/filter-transaction/online/${form.data.query}/${form.data.type}/${form.data.index}`)
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_filterTransactionOnline_V(response.body));
    }catch (error) {
        yield put(_filterTransactionOnline_X('Error when loading data!'));
    };
};
