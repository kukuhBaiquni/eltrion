// export const SERVER_URL = 'http://halalbeef.co.id/';
// export const SERVER_URL = 'http://192.168.0.102/';
// export const SERVER_URL = 'http://192.168.43.24/';
export const SERVER_URL = 'http://halalbeef.co.id:1728/api/v1/';

export const currency = (x) => {
    if (x !== undefined)
    return 'Rp. ' + x.toLocaleString('IT-it') + ',-';
};

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

export const CAPITALIZE = (x) => {
    var cs = x.split(' ')
    var as = cs.map(r => r.toLowerCase())
    var result = []
    for (var i = 0; i < as.length; i++) {
        result.push(as[i].charAt(0).toUpperCase() + as[i].slice(1))
    }
    return result.join(' ')
};

export const CONSTANT = {
    incomeOrder: {
        title: 'Order Received!',
        description: 'Click here for more information and processing!'
    }
};

export const COLORS = {
    primary: '#20a8d8',
    secondary: '#c8ced3',
    warning: '#ffc107',
    info: '#63c2de',
    success: '#4dbd74',
    danger: '#f86c6b',

    cBeef: '#ff6384',
    cChicken: '#36a2eb',
    cFish: '#ffce56',
    cOther: '#66ff70',

    cardHeaderBackground: '#343b41',
    cardBodyBackground: '#3a4149',
    border: '#23282c',
    semiLight: '#bcbcbc',
};
