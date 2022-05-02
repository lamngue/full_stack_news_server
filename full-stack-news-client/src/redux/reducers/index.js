import { combineReducers } from "redux";
import postReducer from "./postReducer";
import contentReducer from "./contentReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  news: postReducer,
  content: contentReducer,
  categories: categoryReducer,
  user: userReducer,
});

export default reducers;
