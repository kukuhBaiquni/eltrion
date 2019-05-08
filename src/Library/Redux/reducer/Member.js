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

        case 'EDIT_MEMBER_INFORMATION_SUCCESS':
        const data = action.data;
        const index = state.data.map(x => x.email).indexOf(data.email);
        let clone = [...state.data];
        clone[index] = data;
        if (index !== -1) {
            return Object.assign({}, state, {
                success: true,
                error: false,
                data: clone
            });
        }else{
            return state;
        };

        case 'EDIT_MEMBER_INFORMATION_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_EDIT_MEMBER_INFORMATION_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        case 'FILTER_MEMBER_SUCCESS':
        return Object.assign({}, state, {
            currentPage: action.data.currentPage,
            totalPage: action.data.totalPage,
            data: action.data.data,
            success: true,
            error: false
        });

        case 'FILTER_MEMBER_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_FILTER_MEMBER_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        case 'STOCK_UPDATE_SUCCESS':
        let copy = [...state.data];
        const i = state.data.map(x => x.email).indexOf(action.data.email);
        copy[i] = action.data;
        return Object.assign({}, state, {
            data: copy, success: true, error: false
        });

        case 'STOCK_UPDATE_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_STOCK_UPDATE_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });


        default:
        return state;
    }
}
