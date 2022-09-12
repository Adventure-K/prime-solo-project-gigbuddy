const pageTitleReducer = (state = 'Dashboard', action) => {
    switch (action.type) {
        case 'UPDATE_PAGE_TITLE':
            return action.payload;
        default:
            return state;
    }
}

export default pageTitleReducer;