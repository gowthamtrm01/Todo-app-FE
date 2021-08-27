
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_FROM_API":
            return [...action.payload];
        case "ADD_TO_DO":
            return [...state, action.payload];
        case "REMOVE_TO_DO":
            return state.filter(item => item._id !== action.id);
        case "DELETE_ALL":
            return [];
        case 'EDIT_TO_DO':
            return state.map((item) => {
                if (item._id === action.payload._id) {
                    return action.payload
                }
                return item
            });
        case 'SEARCH_TO_DO':
            return [...action.payload];
        default:
            return state;
    }
}

export default reducer;