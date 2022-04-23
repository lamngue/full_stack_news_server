const reducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_NEWS":
      return action.payload;
    case "FETCH_NEWS_DETAIL":
      return { ...state, newsDetail: action.payload };
    case "CLEAR_NEWS":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
