const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      const newState = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
