let initialState = {
    online: {
        currentPage: null,
        totalPage: null,
        data: []
    },
    offline: {
        currentPage: null,
        totalPage: null,
        data: []
    },
    selfUsage: {
        currentPage: null,
        totalPage: null,
        data: []
    },
    shopping: {
        currentPage: null,
        totalPage: null,
        data: []
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
            }
        });

        case 'TRANSACTION_OFFLINE_SUCCESS':
        return Object.assign({}, state, {
            offline: {
                ...state.online,
                currentPage: action.data.currentPage,
                totalPage: action.data.limit,
                data: action.data.data
            }
        });

        case 'TRANSACTION_SELFUSAGE_SUCCESS':
        return Object.assign({}, state, {
            selfUsage: {
                ...state.online,
                currentPage: action.data.currentPage,
                totalPage: action.data.limit,
                data: action.data.data
            }
        });

        case 'TRANSACTION_SHOPPING_SUCCESS':
        return Object.assign({}, state, {
            shopping: {
                ...state.online,
                currentPage: action.data.currentPage,
                totalPage: action.data.limit,
                data: action.data.data
            }
        });

        default:
        return state;
    };
};
