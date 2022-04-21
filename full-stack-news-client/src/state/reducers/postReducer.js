const reducer = (state = [], action) => {
  let newState = [];
  switch (action.type) {
    case "FETCH_NEWS":
      return action.payload;
    case "CLEAR_NEWS":
      return action.payload;
    case "EDIT_NEWS":
      return [];
    case "DELETE_NEWS":
      return [];
    default:
      return state;
  }
};

export default reducer;
