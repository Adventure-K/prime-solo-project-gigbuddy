const repReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_REP':
            return action.payload;
        default:
            return state;
    }
}

export default repReducer;