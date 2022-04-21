import { combineReducers } from "redux";
import postReducer from './postReducer';
import contentReducer from './contentReducer';

 const reducers = combineReducers({
    post: postReducer,
    content: contentReducer
});

export default reducers;