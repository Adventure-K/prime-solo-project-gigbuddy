const activeGigRepReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_GIG_REP':
            return action.payload;
        default:
            return state;
    }
}

export default activeGigRepReducer;