const activeGigReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ACTIVE_GIG':
            return action.payload;
        case 'DESELECT_GIG':
            return {};
        default:
            return state;
    }
}

export default activeGigReducer;