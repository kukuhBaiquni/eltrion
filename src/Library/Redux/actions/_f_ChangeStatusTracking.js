import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _changeStatusTracking = (data) => {
    return {
        type: 'CHANGE_STATUS_TRACKING',
        data
    }
};

const _changeStatusTracking_V = (data) => {
    return {
        type: 'CHANGE_STATUS_TRACKING_SUCCESS',
        data
    }
};

const _changeStatusTracking_X = () => {
    return {
        type: 'CHANGE_STATUS_TRACKING_FAILED'
    }
};

export const _resetChangestatusTracking = () => {
    return {
        type: 'RESET_CHANGE_STATUS_TRACKING_STATE'
    }
};

export function* o_changeStatusTracking(data) {
    yield takeEvery('CHANGE_STATUS_TRACKING', k_changeStatusTracking);
};

function* k_changeStatusTracking(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/update/tracking/${form.data.stage}/${form.data.trx}`)
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        console.log(response);
        yield put(_changeStatusTracking_V(response.body.data));
    }catch (error) {
        console.log(error);
        yield put(_changeStatusTracking_X('Error when loading data!'));
    };
}
