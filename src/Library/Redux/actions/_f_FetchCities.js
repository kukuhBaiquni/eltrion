import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchCities = (data) => {
    return {
        type: 'FETCH_CITIES',
        data
    }
};

const _fetchCities_V = (data) => {
    return {
        type: 'FETCH_CITIES_SUCCESS',
        data
    }
};

const _fetchCities_X = () => {
    return {
        type: 'FETCH_CITIES_FAILED'
    }
};

export const _resetFetchCities = () => {
    return {
        type: 'RESET_FETCH_CITIES_STATE'
    }
};

export const _clearCities = () => {
    return {
        type: 'CLEAR_DATA_CITIES'
    }
};

export function* o_fetchCities(data) {
    yield takeEvery('FETCH_CITIES', k_fetchCities);
};

function* k_fetchCities(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`http://halalbeef.co.id/utility/getcities/${form.data}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchCities_V(response.body.data));
    }catch (error) {
        yield put(_fetchCities_X('Error when loading data!'));
    };
}
