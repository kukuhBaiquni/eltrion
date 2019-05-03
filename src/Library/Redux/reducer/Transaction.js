let initialState = {
    online: {
        currentPage: null,
        totalPage: null,
        data: [],
        success: false,
        error: false,
    },
    offline: {
        currentPage: null,
        totalPage: null,
        data: [],
        success: false,
        error: false,
    },
    selfUsage: {
        currentPage: null,
        totalPage: null,
        data: [],
        success: false,
        error: false,
    },
    shopping: {
        currentPage: null,
        totalPage: null,
        data: [],
        success: false,
        error: false,
    }
};

export default function transaction(state = initialState, action) {
    switch (action.type) {

        case 'TRANSACTION_ONLINE_SUCCESS':
        return Object.assign({}, state, {
            online: {
                ...state.online,
                currentPage: action.data.currentPage,
                totalPage: action.data.limit,
                data: action.data.data
            },
            success: true,
            error: false
        });

        case 'TRANSACTION_ONLINE_FAILED':
        return Object.assign({}, state, {
            online: {
                ...state.online,
                success: false,
                error: true
            }
        });

        case 'RESET_FETCH_TRANSACTION_ONLINE_STATE':
        return Object.assign({}, state, {
            online: {
                ...state.online,
                success: false,
                error: false
            }
        });

        // ====================================================================

        case 'TRANSACTION_OFFLINE_SUCCESS':
        return Object.assign({}, state, {
            offline: {
                ...state.offline,
                currentPage: action.data.currentPage,
                totalPage: action.data.limit,
                data: action.data.data
            },
            success: true,
            error: false
        });

        case 'TRANSACTION_OFFLINE_FAILED':
        return Object.assign({}, state, {
            offline: {
                ...state.offline,
                success: false,
                error: true
            }
        });

        case 'RESET_FETCH_TRANSACTION_OFFLINE_STATE':
        return Object.assign({}, state, {
            ...state.offline,
            success: false,
            error: false
        });

        // ====================================================================

        case 'TRANSACTION_SELFUSAGE_SUCCESS':
        return Object.assign({}, state, {
            selfUsage: {
                ...state.selfUsage,
                currentPage: action.data.currentPage,
                totalPage: action.data.limit,
                data: action.data.data
            },
            success: true,
            error: false
        });

        case 'TRANSACTION_SELFUSAGE_FAILED':
        return Object.assign({}, state, {
            ...state.selfUsage,
            success: false,
            error: true
        });

        case 'RESET_FETCH_TRANSACTION_SELFUSAGE_STATE':
        return Object.assign({}, state, {
            ...state.selfUsage,
            success: false,
            error: false
        });

        // ====================================================================

        case 'TRANSACTION_SHOPPING_SUCCESS':
        return Object.assign({}, state, {
            shopping: {
                ...state.shopping,
                currentPage: action.data.currentPage,
                totalPage: action.data.limit,
                data: action.data.data
            },
            success: true,
            error: false
        });

        case 'TRANSACTION_SHOPPING_FAILED':
        return Object.assign({}, state, {
            ...state.shopping,
            success: false,
            error: true
        });

        case 'RESET_FETCH_TRANSACTION_SHOPPING_STATE':
        return Object.assign({}, state, {
            ...state.shopping,
            success: false,
            error: false
        });

        // ====================================================================

        case 'FETCH_ALL_ONLINE_SUCCESS':
        return Object.assign({}, state, {
            online: {
                ...state.online,
                currentPage: action.data.currentPage,
                totalPage: action.data.totalPage,
                data: action.data.data
            },
            success: true,
            error: false
        });

        case 'FETCH_ALL_ONLINE_FAILED':
        return Object.assign({}, state, {
            ...state.online,
            success: false,
            error: true
        });

        case 'RESET_FETCH_ALL_ONLINE_STATE':
        return Object.assign({}, state, {
            ...state.online,
            success: false,
            error: false
        });

        // ====================================================================

        case 'FETCH_ALL_OFFLINE_SUCCESS':
        return Object.assign({}, state, {
            offline: {
                ...state.offline,
                currentPage: action.data.currentPage,
                totalPage: action.data.totalPage,
                data: action.data.data
            },
            success: true,
            error: false
        });

        case 'FETCH_ALL_OFFLINE_FAILED':
        return Object.assign({}, state, {
            ...state.offline,
            success: false,
            error: true
        });

        case 'RESET_FETCH_ALL_OFFLINE_STATE':
        return Object.assign({}, state, {
            ...state.offline,
            success: false,
            error: false
        });

        // ====================================================================

        case 'FETCH_ALL_SELFUSAGE_SUCCESS':
        return Object.assign({}, state, {
            selfUsage: {
                ...state.selfUsage,
                currentPage: action.data.currentPage,
                totalPage: action.data.totalPage,
                data: action.data.data
            },
            success: true,
            error: false
        });

        case 'FETCH_ALL_SELFUSAGE_FAILED':
        return Object.assign({}, state, {
            ...state.selfUsage,
            success: false,
            error: true
        });

        case 'RESET_FETCH_ALL_SELFUSAGE_STATE':
        return Object.assign({}, state, {
            ...state.selfUsage,
            success: false,
            error: false
        });

        // ====================================================================

        case 'FETCH_ALL_SHOPPING_SUCCESS':
        return Object.assign({}, state, {
            shopping: {
                ...state.shopping,
                currentPage: action.data.currentPage,
                totalPage: action.data.totalPage,
                data: action.data.data
            },
            success: true,
            error: false
        });

        case 'FETCH_ALL_SHOPPING_FAILED':
        return Object.assign({}, state, {
            ...state.shopping,
            success: false,
            error: true
        });

        case 'RESET_FETCH_ALL_SHOPPING_STATE':
        return Object.assign({}, state, {
            ...state.shopping,
            success: false,
            error: false
        });

        // ====================================================================
        // ====================================================================

        default:
        return state;
    };
};
