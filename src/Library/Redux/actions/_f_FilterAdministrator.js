import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _filterAdministrator = (data) => {
    return {
        type: 'FILTER_ADMINISTRATOR',
        data
    }
};

const _filterAdministrator_V = (data) => {
    return {
        type: 'FILTER_ADMINISTRATOR_SUCCESS',
        data
    }
};

const _filterAdministrator_X = () => {
    return {
        type: 'FILTER_ADMINISTRATOR_FAILED'
    }
};

export const _resetFilterAdministrator = () => {
    return {
        type: 'RESET_FILTER_ADMINISTRATOR_STATE'
    }
};

export function* o_filterAdministrator(data) {
    yield takeEvery('FILTER_ADMINISTRATOR', k_filterAdministrator);
};

function* k_filterAdministrator(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/get-list-user/query/${form.data.status}/${form.data.type}/${form.data.query}/${form.data.index}`)
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_filterAdministrator_V(response.body));
    }catch (error) {
        yield put(_filterAdministrator_X('Error when loading data!'));
    };
};
