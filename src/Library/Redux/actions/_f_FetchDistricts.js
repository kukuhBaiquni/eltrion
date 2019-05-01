import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchDistricts = (data) => {
    return {
        type: 'FETCH_DISTRICTS',
        data
    }
};

const _fetchDistricts_V = (data) => {
    return {
        type: 'FETCH_DISTRICTS_SUCCESS',
        data
    }
};

const _fetchDistricts_X = () => {
    return {
        type: 'FETCH_DISTRICTS_FAILED'
    }
};

export const _resetFetchDistricts = () => {
    return {
        type: 'RESET_FETCH_DISTRICTS_STATE'
    }
};

export const _clearDistricts = () => {
    return {
        type: 'CLEAR_DATA_DISTRICTS'
    }
};

export function* o_fetchDistricts(data) {
    yield takeEvery('FETCH_DISTRICTS', k_fetchDistricts);
};

function* k_fetchDistricts(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`http://halalbeef.co.id/utility/getdistricts/${form.data}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchDistricts_V(response.body.data));
    }catch (error) {
        yield put(_fetchDistricts_X('Error when loading data!'));
    };
}
