const reducer = (state = {}, action) => {
  switch (action.type) {
    case "MODIFY_CONTENT":
      const newState = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
