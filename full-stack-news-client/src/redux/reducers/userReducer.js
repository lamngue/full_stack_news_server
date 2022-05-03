const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
    case "GET_USER":
    case "LOGOUT_USER":
      const newState = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
