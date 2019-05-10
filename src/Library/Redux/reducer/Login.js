let initialState = {
    success: false,
    error: false,
    token: '',
    adminData: null,
    errorMessage: ''
};

export default function login(state = initialState, action) {
    switch (action.type) {

        case 'LOGIN_SUCCESS':
        return Object.assign({}, state, {
            success: true,
            error: false,
            token: action.data.token,
            adminData: action.data.data
        });

        case 'LOGIN_FAILED':
        return Object.assign({}, state, {
            success: false,
            error: true,
            errorMessage: action.message
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
