let initialState = {
    success: false,
    error: false,
    currentPage: null,
    totalPage: null,
    data: []
};

export default function administrator(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_LIST_ADMINISTRATOR_SUCCESS':
        return Object.assign({}, state, {
            currentPage: action.data.currentPage,
            totalPage: action.data.totalPage,
            data: action.data.data,
            success: true,
            error: false
        });

        case 'FETCH_LIST_ADMINISTRATOR_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_FETCH_ADMINISTRATOR_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        case 'EDIT_ADMINISTRATOR_INFORMATION_SUCCESS':
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

        case 'EDIT_ADMINISTRATOR_INFORMATION_FAILED':
        return Object.assign({}, state, {
            success: false, error: true
        });

        case 'RESET_EDIT_ADMINISTRATOR_INFORMATION_STATE':
        return Object.assign({}, state, {
            success: false, error: false
        });

        default:
        return state;
    }
}
