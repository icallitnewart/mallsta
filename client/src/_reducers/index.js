import { combineReducers } from "redux";
import user from "./user_reducer";
import store from "./store_reducer";
import product from "./product_reducer";

const rootReducer = combineReducers({
  user,
  store,
  product
})

export default rootReducer;