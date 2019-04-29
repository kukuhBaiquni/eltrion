import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _submitFormEditProduct = (data, token) => {
    return {
        type: 'SUBMIT_FORM_EDIT_PRODUCT',
        data,
        token
    }
};

const _submitFormEditProduct_V = (message) => {
    return {
        type: 'SUBMIT_FORM_EDIT_PRODUCT_SUCCESS',
        data: message
    };
};

const _submitFormEditProduct_X = (message) => {
    return {
        type: 'SUBMIT_FORM_EDIT_PRODUCT_FAILED',
        data: message
    };
};

export const _resetFormEdit = () => {
    return {
        type: 'RESET_FORM_EDIT_STATE'
    };
};

export function* o_submitFormEditProduct(data, token) {
    yield takeEvery('SUBMIT_FORM_EDIT_PRODUCT', k_submitFormEditProduct);
};

function* k_submitFormEditProduct(form) {
    let formData = new FormData();
    formData.append('productname', form.data.productName);
    formData.append('category', form.data.category);
    formData.append('landingprice', form.data.landingPrice);
    formData.append('resellerprice', form.data.memberPrice);
    formData.append('enduserprice', form.data.nonMemberPrice);
    formData.append('unit', form.data.unit);
    formData.append('packing', form.data.packing);
    formData.append('description', form.data.description);
    if (form.data.photo) {
        formData.append('photo', form.data.photo);
    }
    try{
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}admin/crud-product/edit/${form.data.idProduct}`)
            .set('Authorization', `${form.token}`)
            .send(formData)
            .then((res) => {
                return res;
            })
        });
        yield put(_submitFormEditProduct_V(response.body.data));
    }catch (error) {
        yield put(_submitFormEditProduct_X('Error when loading data!'));
    };
};
