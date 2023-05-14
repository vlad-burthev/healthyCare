import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import loginReducer from "./loginReduce";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  repos: loginReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
