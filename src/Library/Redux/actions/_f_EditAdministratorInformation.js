import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _editAdministratorInformation = (data) => {
    return {
        type: 'EDIT_ADMINISTRATOR_INFORMATION',
        data
    }
};

const _editAdministratorInformation_X = () => {
    return {
        type: 'EDIT_ADMINISTRATOR_INFORMATION_FAILED'
    }
};

const _editAdministratorInformation_V = (data) => {
    return {
        type: 'EDIT_ADMINISTRATOR_INFORMATION_SUCCESS',
        data
    }
};

export const _resetEditAdministratorInformation = () => {
    return {
        type: 'RESET_EDIT_ADMINISTRATOR_INFORMATION_STATE'
    }
};

export function* o_editAdministratorInformation(data) {
    yield takeEvery('EDIT_ADMINISTRATOR_INFORMATION', k_editAdministratorInformation)
};

function* k_editAdministratorInformation(form) {
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
        yield put(_editAdministratorInformation_V(response.body.data));
    }catch (error) {
        yield put(_editAdministratorInformation_X('Error when loading data!'));
    };
}
