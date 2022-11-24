import { createStore, combineReducers, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk";
import { commentReducer, postReducer } from "./redux/reducers/post.Reducer";
import { userReducer } from "./redux/reducers/userReducer";

const reducer = combineReducers({
    user: userReducer,
    posts: postReducer,
    comments: commentReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

// module.exports = store;

export default store;