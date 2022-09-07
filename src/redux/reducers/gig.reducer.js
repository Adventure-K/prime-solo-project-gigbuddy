const gigsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GIGS':
            return action.payload;
        default:
            return state;
    }
}

export default gigsReducer;