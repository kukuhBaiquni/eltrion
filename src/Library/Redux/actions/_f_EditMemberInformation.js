import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _editMemberInformation = (data) => {
    return {
        type: 'EDIT_MEMBER_INFORMATION',
        data
    }
};

const _editMemberInformation_X = () => {
    return {
        type: 'EDIT_MEMBER_INFORMATION_FAILED'
    }
};

const _editMemberInformation_V = (data) => {
    return {
        type: 'EDIT_MEMBER_INFORMATION_SUCCESS',
        data
    }
};

export const _resetEditMemberInformation = () => {
    return {
        type: 'RESET_EDIT_MEMBER_INFORMATION_STATE'
    }
};

export function* o_editMemberInformation(data) {
    yield takeEvery('EDIT_MEMBER_INFORMATION', k_editMemberInformation)
};

function* k_editMemberInformation(form) {
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
        yield put(_editMemberInformation_V(response.body.data));
    }catch (error) {
        yield put(_editMemberInformation_X('Error when loading data!'));
    };
}
