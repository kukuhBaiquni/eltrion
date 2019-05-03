import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchAllOnline = (data) => {
    return {
        type: 'FETCH_ALL_ONLINE',
        data
    }
};

const _fetchAllOnline_V = (data) => {
    return {
        type: 'FETCH_ALL_ONLINE_SUCCESS',
        data
    }
};

const _fetchAllOnline_X = () => {
    return {
        type: 'FETCH_ALL_ONLINE_FAILED'
    }
};

export const _resetFetchAllOnline = () => {
    return {
        type: 'RESET_FETCH_ALL_ONLINE_STATE'
    }
};

export function* o_fetchAllOnline(data) {
    yield takeEvery('FETCH_ALL_ONLINE', k_fetchAllOnline);
};

function* k_fetchAllOnline(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/fetch-all/transaction/online/${form.data.index}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchAllOnline_V(response.body))
    }catch (error) {
        yield put(_fetchAllOnline_X('Error when loading data!'))
    };
};
