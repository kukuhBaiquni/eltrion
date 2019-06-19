import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _adminData = (data) => {
    return {
        type: 'ADMIN_DATA',
        data
    }
};

const _adminData_V = (data) => {
    return {
        type: 'ADMIN_DATA_SUCCESS',
        data
    }
};

const _adminData_X = () => {
    return {
        type: 'ADMIN_DATA_FAILED'
    }
};

export function* o_adminData(data) {
    yield takeEvery('ADMIN_DATA', k_adminData);
};

function* k_adminData(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}users/${form.data._id}`)
            .set('Authorization', form.data.accessToken)
            .then((res) => {
                return res;
            })
        });
        yield put(_adminData_V(response.body))
    } catch(error) {
        yield put(_adminData_X());
    }
}
