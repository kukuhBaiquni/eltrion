let initialState = {
    totalPage: null,
    data: []
};

export default function member(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_LIST_MEMBER_SUCCESS':
        return Object.assign({}, state, {
            totalPage: action.data.totalPage,
            data: action.data.data
        });

        default:
        return state;
    }
}
