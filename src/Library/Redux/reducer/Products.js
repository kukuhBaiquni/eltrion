let initialState = {
    success: false,
    error: false,
    data: []
};

export default function products(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_PRODUCTS_SUCCESS':
        return Object.assign({}, state, {
            data: action.data,
            success: true,
            error: false
        });

        case 'FETCH_PRODUCTS_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_FETCH_PRODUCT_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        case 'EDIT_PRODUCT_SUCCESS':
        let clone = {...state};
        const index = clone.data.map(x => x.id).indexOf(action.data.id);
        if (index !== -1) {
            clone.data[index] = action.data;
            return Object.assign({}, state, {
                success: true,
                error: false,
                data: clone.data
            });
        }else{
            return state;
        };

        case 'EDIT_PRODUCT_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_EDIT_PRODUCT_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        case 'ADD_PRODUCT_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'ADD_PRODUCT_SUCCESS':
        return Object.assign({}, state, {
            success: true, error: false, data: [...state.data, action.data]
        });

        case 'RESET_ADD_PRODUCT_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        default:
        return state;
    }
}
