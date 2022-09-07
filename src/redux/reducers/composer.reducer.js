const composerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMPOSERS':
            return action.payload;
        default:
            return state;
    }
}

export default composerReducer;