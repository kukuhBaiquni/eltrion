import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _editUserInformation = (data) => {
    return {
        type: 'EDIT_USER_INFORMATION',
        data
    }
};

const _editUserInformation_X = () => {
    return {
        type: 'EDIT_USER_INFORMATION_FAILED'
    }
};

const _editUserInformation_V = (data) => {
    return {
        type: 'EDIT_USER_INFORMATION_SUCCESS',
        data
    }
};

export const _resetEditUserInformation = () => {
    return {
        type: 'RESET_EDIT_USER_INFORMATION_STATE'
    }
};

export function* o_editUserInformation(data) {
    yield takeEvery('EDIT_USER_INFORMATION', k_editUserInformation)
};

function* k_editUserInformation(form) {
    try{
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}admin/crud-user/edit`)
            .set('Authorization', `${form.data.token}`)
            .send({data: form.data})
            .then((res) => {
                return res;
            })
        });
        console.log(response);
        yield put(_editUserInformation_V(response.body.data));
    }catch (error) {
        yield put(_editUserInformation_X('Error when loading data!'));
    };
}
