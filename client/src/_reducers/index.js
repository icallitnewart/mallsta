import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createFilter } from "redux-persist-transform-filter";

import user from "./user_reducer";
import store from "./store_reducer";
import product from "./product_reducer";
import order from "./order_reducer";
import review from "./review_reducer";

const authSubsetFilter = createFilter("user", ["userData"]);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms: [authSubsetFilter]
};

const rootReducer = combineReducers({
  user,
  store,
  product,
  order,
  review
});

export default persistReducer(persistConfig, rootReducer);