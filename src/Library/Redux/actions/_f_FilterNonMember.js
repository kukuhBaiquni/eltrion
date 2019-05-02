import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _filterNonMember = (data) => {
    return {
        type: 'FILTER_NON_MEMBER',
        data
    }
};

const _filterNonMember_V = (data) => {
    return {
        type: 'FILTER_NON_MEMBER_SUCCESS',
        data
    }
};

const _filterNonMember_X = () => {
    return {
        type: 'FILTER_NON_MEMBER_FAILED'
    }
};

export const _resetFilterNonMember = () => {
    return {
        type: 'RESET_FILTER_NON_MEMBER_STATE'
    }
};

export function* o_filterNonMember(data) {
    yield takeEvery('FILTER_NON_MEMBER', k_filterNonMember);
};

function* k_filterNonMember(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/get-list-user/query/${form.data.status}/${form.data.type}/${form.data.query}/${form.data.index}`)
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_filterNonMember_V(response.body));
    }catch (error) {
        yield put(_filterNonMember_X('Error when loading data!'));
    };
};
