import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchAdministrator = (data) => {
    return {
        type: 'FETCH_LIST_ADMINISTRATOR',
        data
    };
};

const _fetchAdministrator_X = (message) => {
    return {
        type: 'FETCH_LIST_ADMINISTRATOR_FAILED',
        data: message
    };
};

const _fetchAdministrator_V = (nonMember) => {
    return {
        type: 'FETCH_LIST_ADMINISTRATOR_SUCCESS',
        data: nonMember
    };
};

export const _resetFetchAdministrator = () => {
    return {
        type: 'RESET_FETCH_ADMINISTRATOR_STATE'
    }
};

export function* o_fetchAdministrator(data) {
    yield takeEvery('FETCH_LIST_ADMINISTRATOR', k_fetchAdministrator);
};

function* k_fetchAdministrator(form) {
    try{
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}admin/get-list-administrator/index/${form.data.index}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchAdministrator_V(response.body))
    }catch (error) {
        yield put(_fetchAdministrator_X('Error when loading data!'))
    };
};
