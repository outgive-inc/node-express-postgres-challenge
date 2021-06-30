const Reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_TASK_LIST":
            return {
                ...state,
                taskList: payload,
            };

        default:
            return state;
    }
};

export default Reducer;
