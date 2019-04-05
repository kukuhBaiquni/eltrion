let initialState = [];

export default function products(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_PRODUCTS_SUCCESS':
        return action.data;

        default:
        return state;
    }
}
