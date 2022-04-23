import { combineReducers } from "redux";
import postReducer from "./postReducer";
import contentReducer from "./contentReducer";
import categoryReducer from "./categoryReducer";

const reducers = combineReducers({
  news: postReducer,
  content: contentReducer,
  categories: categoryReducer,
});

export default reducers;
