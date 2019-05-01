import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchVillages = (data) => {
    return {
        type: 'FETCH_VILLAGES',
        data
    }
};

const _fetchVillages_V = (data) => {
    return {
        type: 'FETCH_VILLAGES_SUCCESS',
        data
    }
};

const _fetchVillages_X = () => {
    return {
        type: 'FETCH_VILLAGES_FAILED'
    }
};

export const _resetFetchVillages = () => {
    return {
        type: 'RESET_FETCH_VILLAGES_STATE'
    }
};

export const _clearVillages = () => {
    return {
        type: 'CLEAR_DATA_VILLAGES'
    }
};

export function* o_fetchVillages(data) {
    yield takeEvery('FETCH_VILLAGES', k_fetchVillages);
};

function* k_fetchVillages(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`http://halalbeef.co.id/utility/getvillages/${form.data}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchVillages_V(response.body.data));
    }catch (error) {
        yield put(_fetchVillages_X('Error when loading data!'));
    };
}
