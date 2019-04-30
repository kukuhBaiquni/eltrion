// export const SERVER_URL = 'http://halalbeef.co.id/';
export const SERVER_URL = 'http://192.168.0.110/';
// export const SERVER_URL = 'http://192.168.43.24/';

export const VC_ID = (data) => {
    if (data < 1000000 && data > 99999 && typeof data === 'number') {
        return true
    }else{
        return {
            status : false,
            message: 'ID Product must be 6 characters & must be a number!'
        }
    }
};

export const VC_PRODUCT_NAME = (data) => {
    if (data.length > 0) {
        return true
    }else{
        return {
            status: false,
            message: 'Please insert a decent Product Name!'
        }
    }
};

export const VC_CATEGORY = (data) => {
    if (data.length > 0) {
        return true
    }else{
        return {
            status: false,
            message: 'Category field cannot empty!'
        }
    }
};

export const VC_PRICE = (data) => {
    if (data < 1000000 && data > 5000 && typeof data === 'number') {
        return true
    }else{
        return {
            status: false,
            message: 'Please enter a valid number!'
        }
    }
};

export const VC_UNIT = (data) => {
    if (data === 'kg' || data === 'pack') {
        return true
    }else{
        return {
            status: false,
            message: 'Please enter a valid value between "kg" or "pack"'
        }
    }
};

export const VC_PACKING = (data) => {
    if (typeof data === 'number') {
        if (data === 1 || data === 2) {
            return true
        }else{
            return {
                status: false,
                message: 'Please enter a valid value!'
            }
        }
    }else{
        return {
            status: false,
            message: 'Your input is invalid!'
        }
    }
};

export const VC_PHOTO = (data) => {
    if (data.name !== undefined) {
        return true
    }else{
        return {
            status: false,
            message: 'Product image cannot empty, please upload an image!'
        }
    }
};
