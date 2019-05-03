import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchAllOffline = (data) => {
    return {
        type: 'FETCH_ALL_OFFLINE',
        data
    }
};

const _fetchAllOffline_V = (data) => {
    return {
        type: 'FETCH_ALL_OFFLINE_SUCCESS',
        data
    }
};

const _fetchAllOffline_X = () => {
    return {
        type: 'FETCH_ALL_OFFLINE_FAILED'
    }
};

export const _resetFetchAllOffline = () => {
    return {
        type: 'RESET_FETCH_ALL_OFFLINE_STATE'
    }
};

export function* o_fetchAllOffline(data) {
    yield takeEvery('FETCH_ALL_OFFLINE', k_fetchAllOffline);
};

function* k_fetchAllOffline(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/fetch-all/transaction/offline/${form.data.index}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchAllOffline_V(response.body))
    }catch (error) {
        yield put(_fetchAllOffline_X('Error when loading data!'))
    };
};
