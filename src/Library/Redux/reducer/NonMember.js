let initialState = {
    success: false,
    error: false,
    currentPage: null,
    totalPage: null,
    data: []
};

export default function nonMember(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_LIST_NON_MEMBER_SUCCESS':
        return Object.assign({}, state, {
            currentPage: action.data.currentPage,
            totalPage: action.data.totalPage,
            data: action.data.data,
            success: true,
            error: false
        });

        case 'FETCH_LIST_NON_MEMBER_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_FETCH_NON_MEMBER_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        case 'EDIT_NON_MEMBER_INFORMATION_SUCCESS':
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

        case 'EDIT_NON_MEMBER_INFORMATION_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_EDIT_NON_MEMBER_INFORMATION_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        case 'FILTER_NON_MEMBER_SUCCESS':
        return Object.assign({}, state, {
            currentPage: action.data.currentPage,
            totalPage: action.data.totalPage,
            data: action.data.data,
            success: true,
            error: false
        });

        case 'FILTER_NON_MEMBER_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_FILTER_NON_MEMBER_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        default:
        return state;
    }
}
