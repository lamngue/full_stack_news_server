const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      const newState = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
