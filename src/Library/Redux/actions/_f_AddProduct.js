import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../../Configuration';

export const _addProduct = (data) => {
    return {
        type: 'ADD_PRODUCT',
        data
    }
};

const _addProduct_X = () => {
    return {
        type: 'ADD_PRODUCT_FAILED'
    }
};

const _addProduct_V = (data) => {
    return {
        type: 'ADD_PRODUCT_SUCCESS',
        data
    }
};

export const _resetAddProduct = () => {
    return {
        type: 'RESET_ADD_PRODUCT_STATE'
    }
};

export function* o_addProduct(data) {
    yield takeEvery('ADD_PRODUCT', k_addProduct);
};

function* k_addProduct(form) {
    let formData = new FormData();
    formData.append('id', form.data.idProduct);
    formData.append('productname', form.data.productName);
    formData.append('category', form.data.category);
    formData.append('landingprice', form.data.landingPrice);
    formData.append('resellerprice', form.data.memberPrice);
    formData.append('enduserprice', form.data.normalPrice);
    formData.append('unit', form.data.unit);
    formData.append('packing', form.data.packing);
    formData.append('description', form.data.description);
    formData.append('photo', form.data.photo);
    try{
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}admin/crud-product/add`)
            .set('Authorization', `${form.data.token}`)
            .send(formData)
            .then((res) => {
                return res;
            })
        });
        yield put(_addProduct_V(response.body.data));
    }catch (error) {
        yield put(_addProduct_X('Error when loading data!'));
    };
}
