import {
  REGISTER_STORE,
  EDIT_STORE,
  GETINFO_STORE
} from "../_actions/types";

export default function(state={}, action) {
  switch (action.type) {
    case REGISTER_STORE :
      return {
        ...state,
        register : action.payload
      }
      break;
    case EDIT_STORE :
      return {
        ...state,
        edit : action.payload
      }
      break;
    case GETINFO_STORE :
      return {
        ...state,
        storeInfo : action.payload
      }
      break;
    default :
      return state;
      break;
  }
}