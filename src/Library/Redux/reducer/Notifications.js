let initialState = {
    success: false,
    error: false,
    data: []
};

export default notifications(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_NOTIFICATIONS_SUCCESS':
        return Object.assign({}, state, {
            success: true,
            error: false,
            data: action.data
        });

        case 'FETCH_NOTIFICATIONS_FAILED':
        return Object.assign({}, state, {
            success: false,
            error: true
        });

        case 'RESET_FETCH_NOTIFICATIONS_STATE':
        return Object.assign({}, state, {
            success: false,
            error: false
        })

        default:
        return state;
    }
};
