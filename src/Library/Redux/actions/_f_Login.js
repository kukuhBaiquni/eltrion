import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _login = (data) => {
    return {
        type: 'LOGIN',
        data
    }
};

const _login_V = (data) => {
    return {
        type: 'LOGIN_SUCCESS',
        data
    }
};

const _login_X = (message) => {
    return {
        type: 'LOGIN_FAILED',
        message
    }
};

export const _resetLogin = () => {
    return {
        type: 'RESET_LOGIN_STATE'
    }
};

export function* o_login(data) {
    yield takeEvery('LOGIN', k_login);
};

function* k_login(form) {
    try{
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}login`)
            .send({email: form.data.email})
            .send({password: form.data.password})
            .set('Content-Type', 'application/json')
            .then((res) => {
                return res;
            })
        });
        yield put(_login_V(response.body.data));
    }catch (error) {
        yield put(_login_X(error.toString()));
    };
};
