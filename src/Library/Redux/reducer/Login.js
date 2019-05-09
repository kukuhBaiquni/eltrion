let initialState = {
    success: false,
    error: false,
    token: ''
};

export default function login(state = initialState, action) {
    switch (action.type) {

        case 'LOGIN_SUCCESS':
        return Object.assign({}, state, {
            success: true,
            error: false,
            token: action.data
        });

        case 'LOGIN_FAILED':
        return Object.assign({}, state, {
            success: false,
            error: true
        });

        case 'RESET_LOGIN_STATE':
        return Object.assign({}, state, {
            success: false,
            error: false
        });

        default:
        return state;
    }
};
