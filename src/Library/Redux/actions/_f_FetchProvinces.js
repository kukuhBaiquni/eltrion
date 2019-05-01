import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchProvinces = () => {
    return {
        type: 'FETCH_PROVINCES',
    }
};

const _fetchProvinces_V = (data) => {
    return {
        type: 'FETCH_PROVINCES_SUCCESS',
        data
    }
};

const _fetchProvinces_X = () => {
    return {
        type: 'FETCH_PROVINCES_FAILED'
    }
};

export const _resetFetchProvinces = () => {
    return {
        type: 'RESET_FETCH_PROVINCES_STATE'
    }
};

export function* o_fetchProvinces() {
    yield takeEvery('FETCH_PROVINCES', k_fetchProvinces);
};

function* k_fetchProvinces() {
    try{
        var response = yield call(() => {
            return request
            .get(`http://halalbeef.co.id/utility/getprovinces`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchProvinces_V(response.body.data));
    }catch (error) {
        yield put(_fetchProvinces_X('Error when loading data!'));
    };
}
