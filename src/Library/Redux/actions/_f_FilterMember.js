import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _filterMember = (data) => {
    return {
        type: 'FILTER_MEMBER',
        data
    }
};

const _filterMember_V = (data) => {
    return {
        type: 'FILTER_MEMBER_SUCCESS',
        data
    }
};

const _filterMember_X = () => {
    return {
        type: 'FILTER_MEMBER_FAILED'
    }
};

export const _resetFilterMember = () => {
    return {
        type: 'RESET_FILTER_MEMBER_STATE'
    }
};

export function* o_filterMember(data) {
    yield takeEvery('FILTER_MEMBER', k_filterMember);
};

function* k_filterMember(form) {
    try{
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}admin/get-list-user/query/${form.data.status}/${form.data.type}/${form.data.query}/${form.data.index}`)
            .set('Authorization', `${form.data.token}`)
            .then((res) => {
                return res;
            })
        });
        yield put(_filterMember_V(response.body));
    }catch (error) {
        yield put(_filterMember_X('Error when loading data!'));
    };
};
