import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _editNonMemberInformation = (data) => {
    return {
        type: 'EDIT_NON_MEMBER_INFORMATION',
        data
    }
};

const _editNonMemberInformation_X = () => {
    return {
        type: 'EDIT_NON_MEMBER_INFORMATION_FAILED'
    }
};

const _editNonMemberInformation_V = (data) => {
    return {
        type: 'EDIT_NON_MEMBER_INFORMATION_SUCCESS',
        data
    }
};

export const _resetEditNonMemberInformation = () => {
    return {
        type: 'RESET_EDIT_NON_MEMBER_INFORMATION_STATE'
    }
};

export function* o_editNonMemberInformation(data) {
    yield takeEvery('EDIT_NON_MEMBER_INFORMATION', k_editNonMemberInformation)
};

function* k_editNonMemberInformation(form) {
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
        yield put(_editNonMemberInformation_V(response.body.data));
    }catch (error) {
        yield put(_editNonMemberInformation_X('Error when loading data!'));
    };
}
