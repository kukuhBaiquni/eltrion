import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchAllSelfUsage = (data) => {
    return {
        type: 'FETCH_ALL_SELFUSAGE',
        data
    }
};

const _fetchAllSelfUsage_V = (data) => {
    return {
        type: 'FETCH_ALL_SELFUSAGE_SUCCESS',
        data
    }
};

const _fetchAllSelfUsage_X = () => {
    return {
        type: 'FETCH_ALL_SELFUSAGE_FAILED'
    }
};

export const _resetFetchAllSelfUsage = () => {
    return {
        type: 'RESET_FETCH_ALL_SELFUSAGE_STATE'
    }
};

export function* o_fetchAllSelfUsage(data) {
    yield takeEvery('FETCH_ALL_SELFUSAGE', k_fetchAllSelfUsage);
};

function* k_fetchAllSelfUsage(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/fetch-all/transaction/self-usage/${form.data.index}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchAllSelfUsage_V(response.body))
    }catch (error) {
        yield put(_fetchAllSelfUsage_X('Error when loading data!'))
    };
};
