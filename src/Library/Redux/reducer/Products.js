let initialState = {
    success: false,
    error: false,
    data: []
};

export default function products(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_PRODUCTS_SUCCESS':
        return Object.assign({}, state, {
            data: action.data
        });

        case 'SUBMIT_FORM_EDIT_PRODUCT_SUCCESS':
        let clone = {...state};
        const index = clone.data.map(x => x.id).indexOf(action.data.id);
        clone.data[index] = action.data;
        return clone

        case 'SUBMIT_FORM_EDIT_PRODUCT_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_FORM_EDIT_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        default:
        return state;
    }
}
