let initialState = {
    province: {
        success: false,
        error: false,
        data: []
    },
    city: {
        success: false,
        error: false,
        data: []
    },
    district: {
        success: false,
        error: false,
        data: []
    },
    village: {
        success: false,
        error: false,
        data: []
    }
};

export default function territorial(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_PROVINCES_SUCCESS':
        return Object.assign({}, state, {
            province: {
                success: true,
                error: false,
                data: action.data
            }
        });

        case 'FETCH_PROVINCES_FAILED':
        return Object.assign({}, state, {
            province: {
                ...state.province,
                success: false,
                error: true
            }
        });

        case 'RESET_FETCH_PROVINCES_STATE':
        return Object.assign({}, state, {
            province: {
                ...state.province,
                success: false,
                error: false
            }
        });

        case 'FETCH_CITIES_SUCCESS':
        return Object.assign({}, state, {
            city: {
                success: true,
                error: false,
                data: action.data
            }
        });

        case 'FETCH_CITIES_FAILED':
        return Object.assign({}, state, {
            city: {
                ...state.city,
                success: false,
                error: true
            }
        });

        case 'RESET_FETCH_CITIES_STATE':
        return Object.assign({}, state, {
            city: {
                ...state.city,
                success: false,
                error: false
            }
        });

        case 'FETCH_DISTRICTS_SUCCESS':
        return Object.assign({}, state, {
            district: {
                success: true,
                error: false,
                data: action.data
            }
        });

        case 'FETCH_DISTRICTS_FAILED':
        return Object.assign({}, state, {
            district: {
                ...state.district,
                success: false,
                error: true
            }
        });

        case 'RESET_FETCH_DISTRICTS_STATE':
        return Object.assign({}, state, {
            district: {
                ...state.district,
                success: false,
                error: false
            }
        });

        case 'FETCH_VILLAGES_SUCCESS':
        return Object.assign({}, state, {
            village: {
                success: true,
                error: false,
                data: action.data
            }
        });

        case 'FETCH_VILLAGES_FAILED':
        return Object.assign({}, state, {
            village: {
                ...state.village,
                success: false,
                error: true
            }
        });

        case 'RESET_FETCH_VILLAGES_STATE':
        return Object.assign({}, state, {
            village: {
                ...state.village,
                success: false,
                error: false
            }
        });

        case 'CLEAR_DATA_CITIES':
        return Object.assign({}, state, {
            city: {
                ...state.city,
                data: []
            }
        });

        case 'CLEAR_DATA_DISTRICTS':
        return Object.assign({}, state, {
            district: {
                ...state.district,
                data: []
            }
        });

        case 'CLEAR_DATA_VILLAGES':
        return Object.assign({}, state, {
            village: {
                ...state.village,
                data: []
            }
        });

        default:
        return state;
    }
}
