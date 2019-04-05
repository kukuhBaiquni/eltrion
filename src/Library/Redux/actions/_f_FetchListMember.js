import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchMember = (data) => {
    return {
        type: 'FETCH_LIST_MEMBER',
        data
    };
};

const _fetchMember_X = (message) => {
    return {
        type: 'FETCH_LIST_MEMBER_FAILED',
        data: message
    };
};

const _fetchMember_V = (member) => {
    return {
        type: 'FETCH_LIST_MEMBER_SUCCESS',
        data: member
    };
};

export function* o_fetchMember(data) {
    yield takeEvery('FETCH_LIST_MEMBER', k_fetchMember);
};

function* k_fetchMember(form) {
    try{
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}admin/get-list-member/index/${form.data.index}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchMember_V(response.body))
    }catch (error) {
        yield put(_fetchMember_X('Error when loading data!'))
    };
};
