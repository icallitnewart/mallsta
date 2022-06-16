import { combineReducers } from "redux";
import user from "./user_reducer";
import store from "./store_reducer";

const rootReducer = combineReducers({
  user,
  store
})

export default rootReducer;