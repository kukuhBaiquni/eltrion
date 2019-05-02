import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _fetchNonMember = (data) => {
    return {
        type: 'FETCH_LIST_NON_MEMBER',
        data
    };
};

const _fetchNonMember_X = (message) => {
    return {
        type: 'FETCH_LIST_NON_MEMBER_FAILED',
        data: message
    };
};

const _fetchNonMember_V = (nonMember) => {
    return {
        type: 'FETCH_LIST_NON_MEMBER_SUCCESS',
        data: nonMember
    };
};

export const _resetFetchNonMember = () => {
    return {
        type: 'RESET_FETCH_NON_MEMBER_STATE'
    }
};

export function* o_fetchNonMember(data) {
    yield takeEvery('FETCH_LIST_NON_MEMBER', k_fetchNonMember);
};

function* k_fetchNonMember(form) {
    try{
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}admin/get-list-non-member/index/${form.data.index}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_fetchNonMember_V(response.body))
    }catch (error) {
        yield put(_fetchNonMember_X('Error when loading data!'))
    };
};
