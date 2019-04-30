let initialState = {
    success: false,
    error: false,
    currentPage: null,
    totalPage: null,
    data: []
};

export default function member(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_LIST_MEMBER_SUCCESS':
        return Object.assign({}, state, {
            currentPage: action.data.currentPage,
            totalPage: action.data.totalPage,
            data: action.data.data,
            success: true,
            error: false
        });

        case 'FETCH_LIST_MEMBER_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_FETCH_MEMBER_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        default:
        return state;
    }
}
