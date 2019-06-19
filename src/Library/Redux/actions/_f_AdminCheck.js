import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _adminCheck = (data) => {
    return {
        type: 'ADMIN_CHECK',
        data
    }
};

const _adminCheck_V = (data) => {
    return {
        type: 'ADMIN_CHECK_SUCCESS',
        data
    }
};

const _adminCheck_X = (data) => {
    return {
        type: 'ADMIN_CHECK_FAILED'
    }
};

const _nonAdminHandler = (message) => {
    return {
        type: 'NON_ADMIN_DETECTED',
        message
    }
};

export function* o_adminCheck(data) {
    yield takeEvery('ADMIN_CHECK', k_adminCheck);
};

function* k_adminCheck(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}users/${form.data._id}`)
            .set('Authorization', form.data.accessToken)
            .then((res) => {
                return res;
            })
        });
        if (response.body.data.personalIdentity.status === 'Super Admin' || response.body.data.personalIdentity.status === 'admin') {
            yield put(_adminCheck_V());
        }else{
            yield put(_nonAdminHandler('You don\'t have permission to access this site!'));
        }
    }catch (error) {
        yield put(_adminCheck_X('Destination unreachable!'));
    }
};
