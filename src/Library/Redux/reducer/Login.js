let initialState = {
    success: false,
    error: false,
    token: {
        access: '',
        refresh: '',
        validUntil: '',
        _id: ''
    },
    adminData: null,
    errorMessage: '',
    isAdmin: false
};

export default function login(state = initialState, action) {
    switch (action.type) {

        case 'LOGIN_SUCCESS':
        return Object.assign({}, state, {
            success: true,
            error: false,
            token: {
                ...state.token,
                access: action.data.token,
                refresh: action.data.refreshToken,
                validUntil: new Date(action.data.validUntil).getTime(),
                _id: action.data.userId
            }
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

        case 'NON_ADMIN_DETECTED':
        return Object.assign({}, state, {
            success: false,
            error: true,
            errorMessage: action.message,
            adminData: null,
            token: {
                ...state.token,
                access: '',
                refresh: '',
                validUntil: '',
                _id: ''
            }
        });

        case 'LOGOUT':
        return Object.assign({}, state, {
            success: false,
            error: false,
            token: {
                ...state.token,
                access: '',
                refresh: '',
                validUntil: '',
                _id: ''
            },
            adminData: null,
            errorMessage: ''
        });

        case 'ADMIN_CHECK_SUCCESS':
        return Object.assign({}, state, {
            isAdmin: true
        });

        case 'ADMIN_CHECK_FAILED':
        return Object.assign({}, state, {
            isAdmin: false
        });

        default:
        return state;
    }
};
